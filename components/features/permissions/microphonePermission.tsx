import { useMicrophonePermissions } from "expo-camera";
import { PermissionLayout } from "./permissionLayout";

export function MicrophonePermission(){

    const [permission, requestPermission] = useMicrophonePermissions();


    return(
        <PermissionLayout
            icon="microphone"
            title="Microfono"
            granted={permission?.granted || false}
            requestPermission={requestPermission}
        />
    );
}