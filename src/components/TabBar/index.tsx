import React from 'react';
import { Box, Text, Icon } from '@gympass/yoga';
import { useNavigation } from '@react-navigation/native';
import {
  Favorite,
  FavoriteFilled,
  Star,
  StarFilled,
} from '@gympass/yoga-icons';

import { TabItem } from './styles';

const tabConfig = {
  'Popular Movies': {
    icon: {
      active: StarFilled,
      default: Star,
    },
  },
  'Favorite Genre': {
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
                fill="energy"
                stroke="none"
              />
              <Text.Tiny color="energy">{route.name}</Text.Tiny>
            </TabItem>
          );
        })}
    </Box>
  );
};

export default TabBar;
