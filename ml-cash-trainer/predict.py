import json
import pickle
import sys
from pathlib import Path

import pandas as pd

from feature_engineering import create_features


def main() -> None:
    payload = json.load(sys.stdin)
    data = pd.DataFrame(payload['data'])
    data['date'] = pd.to_datetime(data['date'])
    df = create_features(data)

    models_dir = Path('models')
    with open(models_dir / 'model.pkl', 'rb') as f:
        model = pickle.load(f)
    with open(models_dir / 'scaler.pkl', 'rb') as f:
        scaler = pickle.load(f)

    features = df.drop(columns=['balance'])
    X = scaler.transform(features)
    preds = model.predict(X)
    json.dump({'predictions': preds.tolist()}, sys.stdout)


if __name__ == '__main__':
    main()
