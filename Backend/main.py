"""This is a main script. It is used for exctracting the data about the counties in Croatia."""

# External imports
import pandas as pd


def get_data():
    """A function for extracting the data from the Excel sheet and converting it to a dictionary."""
    # Reads Excel and converts it to the DataFrame
    df = pd.read_excel("../Data/Podaci po zupanijama.xlsx")

    # Converts the DataFrame to a dictionary
    df_to_dict = df.to_dict(orient="records")

    return df_to_dict
