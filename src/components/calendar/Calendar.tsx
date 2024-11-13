import { useState, useEffect, ChangeEvent } from "react";
import "./Calendar.css";
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const Calendar = ({
    label,
    onChange,
    defaultValue,
}: {
    label: string;
    defaultValue?: string;
    onChange?: (month: string, year: string) => void;
}) => {
    const [defaultYear, defaultMonth] = defaultValue ? defaultValue.split("-") : "";
    const [years, setYears] = useState<number[]>([]);
    const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
    const [selectedYear, setSelectedYear] = useState(defaultYear);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const generatedYears: number[] = [];
        for (let year = 1990; year <= currentYear; year++) {
            generatedYears.push(year);
        }
        setYears(generatedYears);
    }, []);

    useEffect(() => {
        if (onChange && selectedMonth && selectedYear) {
            onChange(selectedMonth, selectedYear);
        }
    }, [selectedMonth, selectedYear]);

    const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(event.target.value);
    };

    return (
        <div className="calendar">
            <label htmlFor="">{label}</label>
            <div className="calendar__picker">
                <div className="calendar__picker-item">
                    <select
                        className="form-field"
                        id="month"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                    >
                        <option value="" disabled>
                            Select Month
                        </option>
                        {months.map((month, index) => (
                            <option key={index} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="calendar__picker-item">
                    <select
                        className="form-field"
                        id="year"
                        value={selectedYear}
                        onChange={handleYearChange}
                    >
                        <option value="" disabled>
                            Select Year
                        </option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
