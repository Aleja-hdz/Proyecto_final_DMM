import { useEffect, useState } from "react";
import { PermissionLayout } from "./permissionLayout";
import { getPermissionsAsync, PermissionResponse, requestPermissionsAsync } from "expo-contacts";

export function ContactsPermission(){

    //estado para el permiso de contacto
    const [permission, setPermission] = useState<PermissionResponse | undefined>(undefined);

    //Funcion para solicitar acceso al contacto
    const requestPermission = () => {
        requestPermissionsAsync()
        .then((result) => {
            setPermission(result);
        })
    }

    //Verifica el estado del permiso
    useEffect(() => {
        getPermissionsAsync()
        .then((result) => {
            console.log(result);
            setPermission(result);
        });
    },[]);

    return(
        <PermissionLayout
            icon="users"
            title="Conctactos"
            granted={permission?.granted||false}
            requestPermission={requestPermission}
        />
    );
}