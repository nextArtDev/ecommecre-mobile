import { FlatList, Text } from 'react-native'
import products from '../../assets/products.json'
import ProductListItem from '@/components/ProductListItem'
import { Button, ButtonText } from '@/components/ui/button'
import '@/global.css'
import { Box } from '@/components/ui/box'

export default function HomeScreen() {
  return (
    <>
      <Button className="mt-20 !w-20 mx-auto">
        <ButtonText className=" ">Text</ButtonText>
      </Button>

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
      />
    </>
  )
}
