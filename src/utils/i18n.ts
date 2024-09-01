import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        // @ts-ignore
        debug: process.env.NODE_ENV === "development",
        fallbackLng: "en",
        resources: {
            en: {
                translation: {}
            },
            pl: {
                translation: {
                    Settings: "Ustawienia",
                    "Login With Github": "Zaloguj się przez Github",
                    Created: "Utworzone",
                    Pinned: "Przypięte",
                    "Sign Out": "Wyloguj się",
                    "Sign out of your account.": "Wyloguj się z konta.",
                    "Change language": "Zmień język",
                    "Change the language of the app.": "Zmień język aplikacji.",
                    Back: "Wróć",
                    Today: "Dzisiaj",
                    "All Day": "Cały dzień",
                    "This appointment": "To spotkanie",
                    "This and following appointments": "To i kolejne spotkania",
                    "All appointments": "Wszystkie spotkania",
                    "Edit recurring appointment": "Edytuj powtarzające się spotkanie",
                    "Delete recurring appointment": "Usuń powtarzające się spotkanie",
                    Cancel: "Anuluj",
                    Ok: "Ok",
                    Save: "Zapisz",
                    Repeat: "Powtarzaj",
                    "More Information": "Więcej informacji",
                    Title: "Tytuł",
                    Notes: "Notatki",
                    Never: "Nigdy",
                    Daily: "Codziennie",
                    Weekly: "Co tydzień",
                    Monthly: "Co miesiąc",
                    Yearly: "Co rok",
                    "Repeat every": "Powtarzaj co",
                    "day(s)": "dzień/dni",
                    "End repeat": "Zakończ powtarzanie",
                    On: "Po",
                    After: "Po",
                    "occurrence(s)": "wystąpieniu/wystąpieniach",
                    "week(s) on:": "tydzień/tygodnie w:",
                    "month(s)": "miesiąc/miesiące",
                    "of every month": "każdego msc.",
                    The: "W",
                    First: "Pierwszy",
                    Second: "Drugi",
                    Third: "Trzeci",
                    Fourth: "Czwarty",
                    Last: "Ostatni",
                    "year(s)": "rok/lata",
                    of: "z",
                    Every: "Co",
                    Details: "Szczegóły",
                    "Pinned Users": "Przypięci użytkownicy",
                    "week-view": "widok-tygodniowy",
                    "day-view": "widok-dzienny",
                    "month-view": "widok-miesięczny",
                    Week: "Tydzień",
                    Day: "Dzień",
                    Month: "Miesiąc"
                }
            }
        }
    });
