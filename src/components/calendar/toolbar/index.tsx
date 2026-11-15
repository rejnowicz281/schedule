import { Toolbar } from "@devexpress/dx-react-scheduler-material-ui";
import FilterSetter from "./filter-setter";

export default function CustomToolbar({
    filters,
    setFilters
}: {
    filters: Set<string>;
    setFilters: React.Dispatch<React.SetStateAction<Set<string>>>;
}) {
    return (
        <Toolbar
            rootComponent={(props) => <Toolbar.Root {...props} className="overflow-y-auto flex-wrap" />}
            flexibleSpaceComponent={(props) => (
                <Toolbar.FlexibleSpace {...props} className="flex-1 flex items-center pl-6">
                    <FilterSetter filters={filters} setFilters={setFilters} />
                </Toolbar.FlexibleSpace>
            )}
        />
    );
}
