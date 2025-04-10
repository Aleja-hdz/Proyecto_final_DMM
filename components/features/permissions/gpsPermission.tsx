import { PermissionLayout } from "./permissionLayout";

import * as Location from 'expo-location';

export function GpsPermission(){

    const [permission, requestPermission] = Location.useForegroundPermissions();

    return(
        <PermissionLayout
            icon="search-location"
            title="GPS"
            granted={permission?.granted||false}
            requestPermission={requestPermission}
        />
    );
}