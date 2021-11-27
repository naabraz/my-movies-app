import React from 'react';
import styled from 'styled-components/native';

import { ThemeProvider, Box, Text, Icon } from '@gympass/yoga';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Favorite,
  FavoriteFilled,
  Star,
  StarFilled,
  Play,
  PlayFilled,
} from '@gympass/yoga-icons';

export const TabItem = styled(TouchableOpacity)`
  flex: 1;
  align-items: center;
  margin-bottom: 20px;
`;

const tabConfig = {
  'Popular Movies': {
    icon: {
      active: StarFilled,
      default: Star,
    },
  },
  'Genre List': {
    icon: {
      active: PlayFilled,
      default: Play,
    },
  },
  'Favorite Genres': {
    icon: {
      active: FavoriteFilled,
      default: Favorite,
    },
  },
};

type TabBarProps = {
  state: {
    routes: Array<{ name: string }>;
    index: number;
  };
};

const TabBar: React.FC<TabBarProps> = ({ state }) => {
  const { navigate } = useNavigation<{ navigate: Function }>();
  const { routes, index: activeRouteIndex } = state;

  const screenNavigate = (name: string): void => navigate({ name: name });

  return (
    <ThemeProvider>
      <Box flexDirection="row" pv="small" ph="small" bg="stamina">
        {routes &&
          routes.map((route, routeIndex) => {
            const { name } = route;
            const isRouteActive = routeIndex === activeRouteIndex;

            const YogaIcon = isRouteActive
              ? tabConfig[name].icon.active
              : tabConfig[name].icon.default;

            return (
              <TabItem key={name} onPress={(): void => screenNavigate(name)}>
                <Icon
                  as={YogaIcon}
                  width="large"
                  height="large"
                  fill="vibin"
                  testID={`Icon${routeIndex}`}
                />
                <Text.Tiny color="vibin">{route.name}</Text.Tiny>
              </TabItem>
            );
          })}
      </Box>
    </ThemeProvider>
  );
};

export default TabBar;
