export type Dataset = {
  name: string;
  file: string;
  problemType?: string;
  rowCount?: number;
  columnCount?: number;
  targetColumn?: string;
  description?: string;
};

export const DATASETS: Dataset[] = [
  {
    name: "Boston",
    file: "Boston.csv",
    problemType: "regression",
    rowCount: 506,
    columnCount: 14,
    targetColumn: "medv",
    description: "Boston housing values & socioeconomic metrics",
  },
  {
    name: "College",
    file: "College.csv",
    problemType: "classification",
    rowCount: 777,
    columnCount: 18,
    targetColumn: "Private",
    description: "US higher education demographics & admission stats",
  },
  {
    name: "Heart",
    file: "heart.csv",
    problemType: "classification",
    rowCount: 303,
    columnCount: 14,
    targetColumn: "AHD",
    description: "Cleveland clinic heart disease diagnosis indicators",
  },
  {
    name: "Movies",
    file: "movies.csv",
    problemType: "regression",
    rowCount: 5043,
    columnCount: 28,
    targetColumn: "imdb_score",
    description: "IMDb movie database features and user rating scores",
  },
  {
    name: "MT Cars",
    file: "mtcars.csv",
    problemType: "regression",
    rowCount: 32,
    columnCount: 11,
    targetColumn: "mpg",
    description: "Motor Trend car performance & design benchmarks (1974)",
  },
  {
    name: "S&P Market",
    file: "Smarket.csv",
    problemType: "classification",
    rowCount: 1250,
    columnCount: 9,
    targetColumn: "Direction",
    description: "Daily S&P 500 stock index percentage returns (2001-2005)",
  },
  {
    name: "Swiss Census",
    file: "swiss-census.csv",
    problemType: "regression",
    rowCount: 47,
    columnCount: 6,
    targetColumn: "Fertility",
    description: "Swiss provincial fertility & socioeconomic survey (1888)",
  },
];
