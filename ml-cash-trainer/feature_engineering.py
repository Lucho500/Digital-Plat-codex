import pandas as pd


def create_features(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()
    df['month'] = df['date'].dt.month
    df['quarter'] = df['date'].dt.to_period('Q').dt.quarter
    df['trend'] = range(len(df))

    for col in ['inflow', 'outflow', 'balance']:
        q_low = df[col].quantile(0.05)
        q_high = df[col].quantile(0.95)
        df[col] = df[col].clip(q_low, q_high)

    return df
