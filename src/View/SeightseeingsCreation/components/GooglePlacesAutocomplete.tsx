import React, { forwardRef, useState } from 'react';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef,
  Point,
} from 'react-native-google-places-autocomplete';
import { View } from 'react-native-ui-lib';

type GooglePlacesInput = {
  onSelect: (x: Point | undefined) => void;
  placeholder: string;
};

const initialStyle = {
  flex: 0,
  backgroundColor: 'white',
  marginBottom: 70,
};

export const GooglePlacesInput: React.ForwardRefExoticComponent<GooglePlacesInput> =
  forwardRef(
    (
      { onSelect, placeholder },
      ref: React.Ref<GooglePlacesAutocompleteRef>,
    ) => {
      const [style, setStyle] = useState(initialStyle);
      return (
        <View style={style}>
          <GooglePlacesAutocomplete
            ref={ref}
            styles={{
              textInput: {
                paddingLeft: 0,
                fontSize: 16,
                borderBottomColor: '#cfcfcf',
                borderBottomWidth: 1,
              },
            }}
            placeholder={placeholder}
            fetchDetails={true}
            onPress={(data, details = null) => {
              setStyle({ ...style, flex: 0 });
              onSelect(details?.geometry.location);
            }}
            textInputProps={{
              onPressIn: () => setStyle({ ...style, flex: 1 }),
            }}
            onFail={error => console.error(error)}
            query={{
              key: 'AIzaSyCs1JHoSPRzZ9X3GyA7TPtnImFpKRPQKGo',
              language: 'es',
              components: 'country:es',
            }}
          />
        </View>
      );
    },
  );
