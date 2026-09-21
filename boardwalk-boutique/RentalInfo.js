import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-web";
import Logo from "./assets/skateboards/logo.png";

const BLUE = "#C8D4EE";
const DARK = "#12345C";
const TAX_RATE = 0.07;
const TAX_CAD = 0.05;

export default function RentalInfo({
  setPage,
  rentalCart,
  increaseItem,
  decreaseItem,
  deleteItem,
  likedItems,
}) {
  const totalItems = rentalCart.reduce((sum, item) => sum + item.quantity, 0);
  const totalLiked = likedItems.reduce((sum, item) => sum + item.quantity, 0);
  const getNumberFromPrice = (price) => {
    return Number(price.replace(/[^0-9.]/g, ""));
  };

  const subtotal = rentalCart.reduce((total, item) => {
    return total + getNumberFromPrice(item.price) * item.quantity;
  }, 0);

  

  const tax = subtotal * TAX_RATE;
  const cadtax = subtotal * TAX_CAD;
  const total = subtotal + tax + cadtax;

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setPage("home")} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={34} color={DARK} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPage("home")}>
                  <Image source={Logo} style={styles.logo} resizeMode="contain" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuButton}>
                          <Ionicons name="menu" size={28} color="black" />
                        </TouchableOpacity>
                      </View>

        <Text style={styles.title}>Rental Info</Text>

      <ScrollView contentContainerStyle={styles.content}>
        {rentalCart.length === 0 ? (
          <View style={styles.emptyBox}>
            <Ionicons name="cart-outline" size={44} color={DARK} />
            <Text style={styles.emptyText}>Your Cart is Empty!</Text>
          </View>
        ) : (
          rentalCart.map((item, index) => (
            <View key={`${item.type}-${index}`} style={styles.itemCard}>
              <Image source={item.image} style={styles.image} resizeMode="contain" />

              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.type}>{item.type}</Text>
                <Text style={styles.price}>{item.price}</Text>

                <View style={styles.quantityRow}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => decreaseItem(item.type)}
                  >
                    <Ionicons name="remove" size={18} color="white" />
                  </TouchableOpacity>

                  <Text style={styles.quantityText}>{item.quantity}</Text>

                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => increaseItem(item.type)}
                  >
                    <Ionicons name="add" size={18} color="white" />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteItem(item.type)}
              >
                <Ionicons name="trash-outline" size={22} color="#B00000" />
              </TouchableOpacity>
            </View>
          ))
        )}

        {rentalCart.length > 0 && (
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>Order Summary</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Subtotal</Text>
              <Text style={styles.summaryText}>${subtotal.toFixed(2)}</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>PST (7%)</Text>
              <Text style={styles.summaryText}>${tax.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>GST (5%)</Text>
              <Text style={styles.summaryText}>${cadtax.toFixed(2)}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>
                ${total.toFixed(2)}
            </Text>
            </View>

            <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
       <View style={styles.bottomNav}>
                                   {/* the home button */}
                                   <TouchableOpacity onPress={() => setPage("home")} >
                                             <Ionicons name="home-outline" size={24} />
                                   </TouchableOpacity>
                                   {/* the shopping cart */}
                                        <TouchableOpacity onPress={() => setPage("rentalInfo")}>
                                        <Ionicons name="cart-outline" size={24} />
                                        {totalItems > 0 && (
                                          <View style={styles.bottomCartBadge}>
                                            <Text style={styles.cartBadgeText}>{totalItems}</Text>
                                          </View>
                                        )}
                                      </TouchableOpacity>
                                     {/* go to the recommendation page */}
                                     <TouchableOpacity onPress={() => setPage("recommendation")}>
                                             <Ionicons name="add-circle-outline" size={24} />
                                     </TouchableOpacity> 
                                     {/* going to liked page */}
                                     <TouchableOpacity onPress={() => setPage("Favourite")}>
  <Ionicons name="heart-outline" size={24} />
  {totalLiked > 0 && (
    <View style={styles.bottomLikeBadge}>
      <Text style={styles.LikeBadgeText}>{totalLiked}</Text>
    </View>
  )}
</TouchableOpacity>
                                     </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BLUE,
  },

  header: {
    height: 110,
    backgroundColor: BLUE,
    justifyContent: "center",
    alignItems: "center",
  },

  backBtn: {
    position: "absolute",
    left: 24,
    top: 30,
    zIndex: 2,
  },

  title: {
    color: DARK,
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "serif",
    textAlign: "center",
    paddingTop: 20,
    // marginBottom: 5,
  },

   menuButton: {
    position: "absolute",
    right: 24,
    top: 30,
  },

  logo: {
    width: 170,
    height: 80,
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    height: 55,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },

  bottomCartBadge: {
  position: "absolute",
  top: -10,
  right: -10,
  backgroundColor: "red",
  minWidth: 17,
  height: 17,
  borderRadius: 9,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 4,
},

cartBadgeText: {
  color: "white",
  fontSize: 10,
  fontWeight: "bold",
},

LikeBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },

  bottomLikeBadge: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "red",
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },


  content: {
    padding: 20,
    paddingBottom: 80,
    fontFamily: "serif",
  },

  emptyBox: {
    marginTop: 100,
    alignItems: "center",
  },

  emptyText: {
    marginTop: 12,
    color: DARK,
    fontSize: 16,
    fontFamily: "serif",
  },

  itemCard: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 75,
    height: 110,
  },

  info: {
    marginLeft: 16,
    flex: 1,
  },

  name: {
    color: DARK,
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "serif",
  },

  type: {
    color: DARK,
    fontSize: 14,
    marginTop: 4,
    fontFamily: "serif",
  },

  price: {
    color: DARK,
    fontSize: 14,
    marginTop: 8,
    fontWeight: "bold",
    fontFamily: "serif",
  },

  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    gap: 10,
  },

  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: DARK,
    alignItems: "center",
    justifyContent: "center",
  },

  quantityText: {
    color: DARK,
    fontSize: 16,
    fontWeight: "bold",
  },

  deleteButton: {
    padding: 8,
  },

  summaryBox: {
    backgroundColor: "white",
    borderRadius: 18,
    padding: 18,
    marginTop: 10,
  },

  summaryTitle: {
    color: DARK,
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "serif",
    marginBottom: 14,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  summaryText: {
    color: DARK,
    fontSize: 15,
    fontFamily: "serif",
  },

  divider: {
    height: 1,
    backgroundColor: "#C8D4EE",
    marginVertical: 8,
  },

  totalText: {
    color: DARK,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "serif",
  },
  checkoutButton: {
  backgroundColor: DARK,
  marginTop: 18,
  borderRadius: 16,
  height: 55,
  alignItems: "center",
  justifyContent: "center",
},

checkoutText: {
  color: "white",
  fontSize: 17,
  fontWeight: "bold",
  fontFamily: "serif",
},
});