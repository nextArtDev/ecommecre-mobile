const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config')

const config = getDefaultConfig(__dirname)

// module.exports = withNativeWind(config, { input: './global.css' })
// module.exports = wrapWithReanimatedMetroConfig(config)

// Wrap the config with NativeWind
const nativeWindConfig = withNativeWind(config, { input: './global.css' })

// Wrap the NativeWind config with Reanimated
const finalConfig = wrapWithReanimatedMetroConfig(nativeWindConfig)

// Export the final configuration
module.exports = finalConfig
