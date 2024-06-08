"""This is a main script. It is used for exctracting the data about Croatia."""

# External imports
import pandas as pd
import sqlite3


def create_db():
    """A function used for creating a database."""

    # Connects to the database
    conn = sqlite3.connect("../Data/podaci.db")
    cursor = conn.cursor()

    # Creates database structure
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS podaci_zupanije (
                    id INTEGER PRIMARY KEY,
                    ime_zupanije TEXT,
                    sjediste TEXT,
                    povrsina REAL,
                    gustoca REAL,
                    o_zupaniji TEXT,
                    godina_1857 INTEGER,
                    godina_1900 INTEGER,
                    godina_1931 INTEGER,
                    godina_1961 INTEGER,
                    godina_1991 INTEGER,
                    godina_2001 INTEGER,
                    godina_2011 INTEGER,
                    godina_2021 INTEGER
        )
    ''')

    cursor.execute('''
            CREATE TABLE IF NOT EXISTS podaci_drzava (
                        id INTEGER PRIMARY KEY,
                        ime_drzave TEXT,
                        povrsina REAL,
                        gustoca REAL,
                        o_drzavi TEXT,
                        povijest TEXT,
                        politicki_ustroj TEXT,
                        drzavni_simboli TEXT,
                        valuta TEXT,
                        jezik TEXT,
                        religija TEXT,
                        klima TEXT,
                        godina_1857 INTEGER,
                        godina_1900 INTEGER,
                        godina_1931 INTEGER,
                        godina_1961 INTEGER,
                        godina_1991 INTEGER,
                        godina_2001 INTEGER,
                        godina_2011 INTEGER,
                        godina_2021 INTEGER
            )
        ''')

    cursor.execute('''
            CREATE TABLE IF NOT EXISTS hrvatska_povijest (
                        id INTEGER PRIMARY KEY,
                        kameno_doba TEXT,
                        metalno_doba TEXT,
                        doba_grka_ilira_rimljana TEXT,
                        dolazak_hrvata TEXT,
                        hrvatsko_kraljevstvo TEXT,
                        hrvatsko_ugarska_unija TEXT,
                        ratovi_s_osmanlijama TEXT,
                        habsburska_monarhija TEXT,
                        oslobadanje_od_osmanlija TEXT,
                        hrvatski_narodni_preporod TEXT,
                        hrvatsko_ugarska_nagodba TEXT,
                        prva_jugoslavija TEXT,
                        nezavisna_drzava_hrvatska TEXT,
                        sfr_jugoslavija TEXT,
                        neovisna_hrvatska TEXT
            )
        ''')

    cursor.execute('''
            CREATE TABLE IF NOT EXISTS gradovi (
                        id INTEGER PRIMARY KEY,
                        ime_grada TEXT,
                        zupanija TEXT,
                        gustoca REAL,
                        povrsina REAL,
                        postanski_broj TEXT,
                        pozivni_broj TEXT,
                        registracijska_oznaka TEXT,
                        povijest TEXT,
                        zemljopisna_sirina REAL,
                        zemljopisna_visina REAL,
                        godina_1857 INTEGER,
                        godina_1869 INTEGER,
                        godina_1880 INTEGER,
                        godina_1890 INTEGER,
                        godina_1900 INTEGER,
                        godina_1910 INTEGER,
                        godina_1921 INTEGER,
                        godina_1931 INTEGER,
                        godina_1948 INTEGER,
                        godina_1953 INTEGER,
                        godina_1961 INTEGER,
                        godina_1971 INTEGER,
                        godina_1981 INTEGER,
                        godina_1991 INTEGER,
                        godina_2001 INTEGER,
                        godina_2011 INTEGER,
                        godina_2021 INTEGER
            )
        ''')

    # Closes the connection
    conn.close()


def excel_to_db():
    """A function for extracting the data from the Excel sheet storing it to the database."""

    # Reads Excel and converts it to the DataFrame
    df_county = pd.read_excel("../Data/Podaci.xlsx", sheet_name="Županije")
    df_croatia = pd.read_excel("../Data/Podaci.xlsx", sheet_name="Država")
    df_history = pd.read_excel("../Data/Podaci.xlsx", sheet_name="Hrvatska povijest")
    df_cities = pd.read_excel("../Data/Podaci.xlsx", sheet_name="Gradovi")

    # Connects to the database
    conn = sqlite3.connect("../Data/podaci.db")

    # Puts the data to the database
    df_county.to_sql("podaci_zupanije", conn, if_exists="replace", index=False)
    df_croatia.to_sql("podaci_drzava", conn, if_exists="replace", index=False)
    df_history.to_sql("hrvatska_povijest", conn, if_exists="replace", index=False)
    df_cities.to_sql("gradovi", conn, if_exists="replace", index=False)

    # Closes the connection
    conn.close()


def select_from_table(cursor, table_name, keys):
    """A function for selecting the data from the table."""

    # Gets the data from the database table
    cursor.execute(f"SELECT * FROM {table_name}")
    data = cursor.fetchall()

    result = []
    for row in data:
        item = {}
        for i in range(len(keys)):
            item[keys[i]] = row[i]
        result.append(item)
    return result


def get_data():
    """A function for getting the data from the database."""
    conn = sqlite3.connect("../Data/podaci.db")
    cursor = conn.cursor()

    keys_counties = ["Naziv županije", "Sjedište županije", "Površina", "Gustoća naseljenosti", "O županiji",
                     "1857.", "1900.", "1931.", "1961.", "1991.", "2001.", "2011.", "2021."]
    result_counties = select_from_table(cursor, "podaci_zupanije", keys_counties)

    keys_country = ["Naziv države", "Površina", "Gustoća naseljenosti", "O državi", "Povijest", "Politički ustroj",
                    "Državni simboli", "Valuta", "Jezik", "Religija", "Klima", "1857.", "1900.", "1931.", "1961.",
                    "1991.", "2001.", "2011.", "2021."]
    result_country = select_from_table(cursor, "podaci_drzava", keys_country)

    keys_cities = ["Naziv grada", "Županija", "Gustoća naseljenosti", "Površina", "Poštanski broj", "Pozivni broj",
                   "Registracijska oznaka", "Povijest", "Zemljopisna širina", "Zemljopisna visina", "1857.", "1869.",
                   "1880.", "1890.", "1900.", "1910.", "1921.", "1931.", "1948.", "1953.", "1961.", "1971.", "1981.",
                   "1991.", "2001.", "2011.", "2021."]
    result_cities = select_from_table(cursor, "gradovi", keys_cities)

    keys_history = ["Kameno doba", "Metalno doba", "Doba Grka, Ilira i Rimljana", "Dolazak Hrvata",
                    "Hrvatsko kraljevstvo", "Hrvatsko-ugarska unija", "Ratovi s Osmanlijama", "Habsburška Monarhija",
                    "Oslobađanje od Osmanlija", "Hrvatski narodni preporod", "Hrvatsko-ugarska nagodba",
                    "Prva Jugoslavija",
                    "Nezavisna Država Hrvatska", "SFR Jugoslavija", "Neovisna Hrvatska"]
    result_history = select_from_table(cursor, "hrvatska_povijest", keys_history)

    conn.close()

    return result_counties, result_country, result_cities, result_history


if __name__ == "__main__":
    create_db()
    excel_to_db()
