import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export default function FilterSetter({
    filters,
    setFilters
}: {
    filters: Set<string>;
    setFilters: React.Dispatch<React.SetStateAction<Set<string>>>;
}) {
    const { t } = useTranslation();

    return (
        <div className="flex justify-start pl-6 pt-3">
            <FormControlLabel
                control={
                    <Checkbox
                        checked={filters.has("created")}
                        onChange={() =>
                            setFilters((prev) =>
                                prev.has("created")
                                    ? new Set([...prev].filter((f) => f !== "created"))
                                    : new Set([...prev, "created"])
                            )
                        }
                    />
                }
                label={t("Created")}
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={filters.has("pinned")}
                        onChange={() =>
                            setFilters((prev) =>
                                prev.has("pinned")
                                    ? new Set([...prev].filter((f) => f !== "pinned"))
                                    : new Set([...prev, "pinned"])
                            )
                        }
                    />
                }
                label={t("Pinned")}
            />
        </div>
    );
}
