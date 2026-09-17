import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Logo from "./assets/skateboards/logo.png";

const BLUE = "#C8D4EE";
const DARK = "#12345C";

export default function Favourite({ 
  setPage,
  rentalCart,
  deleteItem, 
  likedItems }) {
  const totalItems = rentalCart.reduce((sum, item) => sum + item.quantity, 0);
  const totalLiked = likedItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setPage("home")}
        >
          <Ionicons name="chevron-back" size={34} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPage("home")}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Your Liked List:</Text>

       {likedItems.length === 0 ? (
  <View style={styles.emptyBox}>
    <Ionicons name="heart-outline" size={44} color={DARK} />
    <Text style={styles.emptyText}>No liked items yet.</Text>
  </View>
) : (
  likedItems.map((item, index) => (
    <View key={`${item.type}-${index}`} style={styles.itemCard}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.type}>{item.type}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteItem(item.type)}
      >
        <Ionicons name="heart" size={22} color="red" />
      </TouchableOpacity>
    </View>
  ))
)}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => setPage("home")}>
          <Ionicons name="home-outline" size={24} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPage("rentalInfo")}>
          <Ionicons name="cart-outline" size={24} />
          {totalItems > 0 && (
            <View style={styles.bottomCartBadge}>
              <Text style={styles.cartBadgeText}>{totalItems}</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPage("recommendation")}>
          <Ionicons name="add-circle-outline" size={24} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPage("Favourite")} >
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

  backButton: {
    position: "absolute",
    left: 24,
    top: 30,
    zIndex: 2,
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

  title: {
    color: DARK,
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "serif",
    textAlign: "center",
    marginBottom: 20,
  },

  content: {
    padding: 20,
    paddingBottom: 80,
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

  LikeBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },

  deleteButton: {
    padding: 8,
  },
});

// needing to change the adding amount from all pages too