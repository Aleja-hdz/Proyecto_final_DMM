import { useCalendarPermissions } from "expo-calendar";
import { PermissionLayout } from "./permissionLayout";
export function CalendarPermission(){
    
    const [permissionResponse, requestPermission] = useCalendarPermissions();

    return(
        <PermissionLayout
            icon="calendar-alt"
            title="Calendario"
            granted={permissionResponse?.granted || false}
            requestPermission={requestPermission}
        />
    );
}