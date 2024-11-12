import numpy as np
import pandas as pd
import yfinance as yf
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.optimizers import Adam

class StockPredictor:
    def __init__(self):
        self.model = None
        self.scaler = MinMaxScaler(feature_range=(0, 1))

    def prepare_data(self, data, time_steps):
        X, y = [], []
        for i in range(len(data) - time_steps):
            X.append(data[i:(i + time_steps), 0])
            y.append(data[i + time_steps, 0])
        return np.array(X), np.array(y)

    def train_model(self, symbol, start_date, end_date):
        # Fetch historical data
        df = yf.download(symbol, start=start_date, end=end_date)
        data = df['Close'].values.reshape(-1, 1)

        # Normalize the data
        scaled_data = self.scaler.fit_transform(data)

        # Prepare data for LSTM
        time_steps = 60
        X, y = self.prepare_data(scaled_data, time_steps)

        # Reshape X to fit LSTM input shape
        X = np.reshape(X, (X.shape[0], X.shape[1], 1))

        # Build LSTM model
        self.model = Sequential([
            LSTM(units=50, return_sequences=True, input_shape=(X.shape[1], 1)),
            LSTM(units=50, return_sequences=False),
            Dense(units=25),
            Dense(units=1)
        ])

        self.model.compile(optimizer=Adam(learning_rate=0.001), loss='mean_squared_error')
        self.model.fit(X, y, batch_size=32, epochs=100, validation_split=0.1, verbose=0)

    def predict(self, symbol, days=30):
        # Fetch the most recent data
        df = yf.download(symbol, period="60d")
        data = df['Close'].values.reshape(-1, 1)
        scaled_data = self.scaler.transform(data)

        # Prepare the last 60 days of data
        X = []
        X.append(scaled_data[-60:, 0])
        X = np.array(X)
        X = np.reshape(X, (X.shape[0], X.shape[1], 1))

        # Make predictions
        predictions = []
        for _ in range(days):
            prediction = self.model.predict(X)
            predictions.append(prediction[0, 0])
            X = np.roll(X, -1, axis=1)
            X[0, -1, 0] = prediction

        # Inverse transform the predictions
        predictions = np.array(predictions).reshape(-1, 1)
        predictions = self.scaler.inverse_transform(predictions)

        return predictions.flatten().tolist()
