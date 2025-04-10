import { usePermissions } from "expo-media-library";
import { PermissionLayout } from "./permissionLayout";

export function GalleryPermission(){

    const [permissionResponse, requestPermission] = usePermissions();

    return(
        <PermissionLayout
            icon="photo-video"
            title="Galeria"
            granted={permissionResponse?.granted || false}
            requestPermission={requestPermission}
        />
    );
}