"""This is a main script. It is used for exctracting the data about the population change in Croatia."""

# External imports
import pandas as pd
import matplotlib.pyplot as plt


def get_data():
    """A function for extracting the data from the Excel sheet and converting it to a dictionary."""
    # Reads Excel and converts it to the DataFrame
    df = pd.read_excel("../Data/Podaci po zupanijama.xlsx")

    # Converts the DataFrame to a dictionary
    df_to_dict = df.to_dict(orient="records")

    return df_to_dict


# Here for visualisation, will be deleted later
def plot_population_change():
    """A function whichs displays population change for each county."""
    data = get_data()

    df = pd.DataFrame(data)

    df.set_index("Naziv županije", inplace=True)

    for county in df.index:
        df.loc[county].plot(kind="line", marker="o", figsize=(10, 6))
        plt.title(county)
        plt.xlabel('Godina')
        plt.ylabel('Broj stanovnika')
        plt.grid(True)
        plt.legend()
        plt.show()

