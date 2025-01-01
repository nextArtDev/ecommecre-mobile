import { View, Text, Pressable, GestureResponderEvent } from 'react-native'
import React, { useEffect } from 'react'
import { icon } from '@/constants/icons'
import { useTheme } from '@react-navigation/native'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

export default function TabBarButton({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  color,
  label,
}: {
  onPress: (event: GestureResponderEvent) => void
  onLongPress: (event: GestureResponderEvent) => void
  isFocused: Boolean
  routeName: string
  color: string
  label: string
}) {
  const { colors } = useTheme()

  const scale = useSharedValue(0)
  useEffect(() => {
    scale.value = withSpring(
      typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused,
      { duration: 350 }
    )
  }, [scale, isFocused])

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0])
    return { opacity }
  })
  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2])
    const top = interpolate(scale.value, [0, 1], [1, 9])
    return {
      transform: [
        {
          scale: scaleValue,
        },
      ],
      top,
    }
  })

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ flex: 1 }}
      className="text-center justify-center items-center gap-2.5"
    >
      <Animated.View style={animatedIconStyle}>
        {icon[routeName]({
          color,
        })}
      </Animated.View>
      <Animated.Text
        className="text-center text-2xs"
        style={[
          {
            color: isFocused ? colors.primary : colors.text,
            // fontSize: 12,
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  )
}
