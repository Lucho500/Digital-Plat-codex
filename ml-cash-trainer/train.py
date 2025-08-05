import json
import pickle
from pathlib import Path

import lightgbm as lgb
import optuna
import pandas as pd
from sklearn.metrics import mean_absolute_percentage_error
from sklearn.preprocessing import StandardScaler

from feature_engineering import create_features


def main():
    data_path = Path('cash_history.csv')
    df = pd.read_csv(data_path, parse_dates=['date'])
    df = create_features(df)
    target = df['balance'].shift(-1).dropna()
    features = df.drop(columns=['balance']).iloc[:-1]

    scaler = StandardScaler()
    X = scaler.fit_transform(features)
    y = target.values
    split = int(len(X) * 0.8)
    X_train, X_valid = X[:split], X[split:]
    y_train, y_valid = y[:split], y[split:]

    train_set = lgb.Dataset(X_train, label=y_train)
    valid_set = lgb.Dataset(X_valid, label=y_valid)

    def objective(trial: optuna.Trial) -> float:
        params = {
            'objective': 'regression',
            'metric': 'mape',
            'verbosity': -1,
            'learning_rate': trial.suggest_float('learning_rate', 0.01, 0.3, log=True),
            'num_leaves': trial.suggest_int('num_leaves', 31, 255),
            'min_data_in_leaf': trial.suggest_int('min_data_in_leaf', 10, 100),
        }
        model = lgb.train(params, train_set, valid_sets=[valid_set], verbose_eval=False)
        preds = model.predict(X_valid)
        return mean_absolute_percentage_error(y_valid, preds)

    study = optuna.create_study(direction='minimize')
    study.optimize(objective, n_trials=20)

    best_params = {
        'objective': 'regression',
        'metric': 'mape',
        'verbosity': -1,
        **study.best_params,
    }
    model = lgb.train(best_params, train_set)
    preds = model.predict(X_valid)
    mape = mean_absolute_percentage_error(y_valid, preds)

    models_dir = Path('models')
    models_dir.mkdir(exist_ok=True)
    with open(models_dir / 'model.pkl', 'wb') as f:
        pickle.dump(model, f)
    with open(models_dir / 'scaler.pkl', 'wb') as f:
        pickle.dump(scaler, f)
    with open(models_dir / 'metrics.json', 'w') as f:
        json.dump({'MAPE': mape}, f)


if __name__ == '__main__':
    main()
