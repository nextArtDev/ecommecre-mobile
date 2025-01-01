import { View, Platform, LayoutChangeEvent } from 'react-native'
import { useLinkBuilder, useTheme } from '@react-navigation/native'
import { Text, PlatformPressable } from '@react-navigation/elements'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

import TabBarButton from './TabBarButton'
import { useState } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useTheme()
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 })
  const buttonWidth = dimensions.width / state.routes.length

  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    })
  }

  const tabPositionX = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    }
  })

  return (
    <View
      onLayout={onTabbarLayout}
      style={{
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
        backdropFilter: '10px',
      }}
      className="absolute bottom-12 justify-between items-center mx-10 bg-white py-4 rounded-3xl backdrop-opacity-35"
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            position: 'absolute',
            backgroundColor: '#723FEB',
            borderRadius: 30,
            marginHorizontal: 12,
            height: dimensions.height - 35,
            width: buttonWidth - 25,
          },
        ]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, {
            duration: 500,
          })
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          })
        }

        return (
          <TabBarButton
            key={route.name}
            onPress={onPress}
            onLongPress={onLongPress}
            isFocused={isFocused}
            routeName={route.name}
            color={isFocused ? colors.card : colors.text}
            label={label}
          />
        )
      })}
    </View>
  )
}
