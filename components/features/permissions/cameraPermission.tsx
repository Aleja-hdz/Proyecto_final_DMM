import { useCameraPermissions } from "expo-camera";
import { PermissionLayout } from "./permissionLayout";

export function CameraPermission(){

    const [permission, requestPermission] = useCameraPermissions();

    console.log(permission);

    return(
        <PermissionLayout
            icon="camera"
            title="Camara"
            granted={permission?.granted || false}
            requestPermission={requestPermission}
        />
    );
}