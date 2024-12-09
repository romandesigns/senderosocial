"use client";
import React, { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  differenceInYears,
} from "date-fns";
import { enUS, es } from "date-fns/locale";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "./ui/label";
import { cx } from "class-variance-authority";
import { Input } from "./ui/input";

const now = new Date();

// 1. Get all months of the year
function getAllMonths(locale = enUS) {
  return Array.from({ length: 12 }, (_, i) =>
    format(new Date(2000, i), "MMMM", { locale })
  );
}

// 2. Get all days of a selected month
function getDaysOfMonth(year: number, month: number, locale = enUS) {
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(start);
  return eachDayOfInterval({ start, end }).map((date) =>
    format(date, "d", { locale })
  );
}

// 3. Get a list of years (80 years back from current year)
function getYearsRange(back = 80) {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - back;
  return Array.from({ length: back + 1 }, (_, i) => startYear + i);
}

export function DatePicker({
  lang,
  name,
  classNames = "",
  direction = "center",
  showAge = false,
}: {
  lang: string;
  name: string;
  classNames?: string;
  direction: "left" | "right" | "center";
  showAge?: boolean;
}) {
  const [date, setDate] = useState<Date | null>(null);
  const [month, setMonth] = useState<number | string>();
  const [day, setDay] = useState<number | string>();
  const [year, setYear] = useState<number | string>();
  const [age, setAge] = useState<number | string>("");
  const [popoverOpen, setPopoverOpen] = useState(false);

  // Calculate the date of birth and age
  useEffect(() => {
    if (month && day && year) {
      setPopoverOpen(false);

      const dateOfBirthString = `${year}-${month}-${day}`;
      const dateOfBirth = new Date(dateOfBirthString);
      setDate(dateOfBirth);

      // Calculate age
      const calculatedAge = differenceInYears(now, dateOfBirth);
      setAge(calculatedAge);
    }
  }, [month, day, year]);

  const isSelected = (value: string | number, selected: string | number) =>
    value === selected ? "bg-primary text-white" : "hover:bg-gray-200";

  return (
    <Label className={cx(classNames)}>
      <div className="flex justify-between items-center">
        <p className="py-1 text-sm text-muted-foreground">
          Fecha de Nacimiento
        </p>
        {showAge ? (
          <p className="text-sm text-muted-foreground">Edad: {age || "--"}</p>
        ) : (
          <div />
        )}
      </div>
      <Input
        type="text"
        name={name}
        className="hidden"
        readOnly
        value={date ? date.toISOString() : ""}
      />
      <Input type="text" name="age" className="hidden" readOnly value={age} />

      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild className="w-full">
              <Button
                className={cx(`justify-start`, {
                  "justify-start": direction === "left",
                  "justify-end": direction === "right",
                  "justify-center": direction === "center",
                })}
                variant="outline"
              >
                {month && day && year
                  ? `${month} / ${day} / ${year}`
                  : "-- / -- / ----"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full max-w-md">
              <div className="flex w-full gap-2">
                <ScrollArea className="col-span-3 row-span-2 h-72 px-3">
                  <div className="grid grid-cols-1 grid-rows-3 grid-flow-row relative">
                    <p className="text-center top-0 left-0 right-0">Mes</p>
                    {getAllMonths(lang === "es" ? es : enUS).map(
                      (monthName, i) => (
                        <Button
                          key={monthName}
                          className={`mb-4 ${isSelected(
                            i + 1 > 9 ? i + 1 : `0${i + 1}`,
                            month ?? ""
                          )}`}
                          variant="ghost"
                          onClick={() =>
                            setMonth(i + 1 > 9 ? i + 1 : `0${i + 1}`)
                          }
                        >
                          {monthName}
                        </Button>
                      )
                    )}
                  </div>
                </ScrollArea>
                <ScrollArea className="col-span-3 row-span-2 h-72 px-3">
                  <div className="grid grid-cols-1 grid-rows-3 grid-flow-row relative">
                    <p className="text-center top-0 left-0 right-0">Day</p>
                    {getDaysOfMonth(now.getFullYear(), now.getMonth() + 1).map(
                      (dayValue, i) => (
                        <Button
                          key={dayValue}
                          className={`mb-4 ${isSelected(
                            i + 1 > 9 ? i + 1 : `0${i + 1}`,
                            day ?? ""
                          )}`}
                          variant="ghost"
                          onClick={() =>
                            setDay(i + 1 > 9 ? i + 1 : `0${i + 1}`)
                          }
                        >
                          {Number(dayValue) > 9 ? dayValue : `0${dayValue}`}
                        </Button>
                      )
                    )}
                  </div>
                </ScrollArea>
                <ScrollArea className="col-span-3 row-span-2 h-72 px-3">
                  <div className="grid grid-cols-1 grid-rows-3 grid-flow-row relative">
                    <p className="text-center top-0 left-0 right-0">Año</p>
                    {getYearsRange().map((yearValue) => (
                      <Button
                        key={yearValue}
                        className={`mb-4 ${isSelected(yearValue, year ?? "")}`}
                        variant="ghost"
                        onClick={() => setYear(yearValue)}
                      >
                        {yearValue}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Label>
  );
}
