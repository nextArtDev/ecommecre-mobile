import { FlatList, Text } from 'react-native'
import products from '../../assets/products.json'
import ProductListItem from '@/components/ProductListItem'
import { Button, ButtonText } from '@/components/ui/button'
import '@/global.css'
import { Box } from '@/components/ui/box'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <FlatList
        data={products}
        numColumns={2}
        // data={products.splice(0, 10)}
        contentContainerClassName="gap-2 max-w-[960px] mx-auto w-full"
        columnWrapperClassName="gap-2"
        renderItem={({ item }) => <ProductListItem product={item} />}
      />
    </SafeAreaView>
  )
}
