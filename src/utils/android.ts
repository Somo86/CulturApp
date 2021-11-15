import { Permission, PermissionsAndroid, Rationale } from 'react-native';

type RequestAndroidPermissionArgs = Rationale & {
  onGranted: () => void;
  onDenied?: () => void;
  permission: Permission;
};

export const requestAndroidPermission = async ({
  permission,
  title,
  message,
  buttonPositive,
  buttonNegative,
  onGranted,
  onDenied,
}: RequestAndroidPermissionArgs) => {
  const granted = await PermissionsAndroid.request(permission, {
    title,
    message,
    buttonPositive,
    buttonNegative,
  });
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    onGranted();
  } else {
    onDenied && onDenied();
  }
};
