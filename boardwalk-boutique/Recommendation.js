import { useState } from "react";
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

import OrangeBoard from "./assets/skateboards/orangeskateboard.png";
import PompomBoard from "./assets/skateboards/pompomboard.png";
import BlueBoard from "./assets/skateboards/blueboard.png";
import PinkBoard from "./assets/skateboards/pinkboard.png";
import WhiteBlueBoard from "./assets/skateboards/whiteblueboard.png";
import MosaicBoard from "./assets/skateboards/mosaicboard.png";

const BLUE = "#C8D4EE";
const DARK = "#12345C";

const items = [
  {
    name: "Girl\nSkateboard",
    type: "Standard",
    price: "$4.00/hr",
    image: OrangeBoard,
    page: "Orange",
  },
  {
    name: "Girl\nSkateboard",
    type: "PomPomPurin",
    price: "$5.00/hr",
    image: PompomBoard,
    page: "Pom",
  },
  {
    name: "Dustin\nHenry",
    type: "",
    price: "$6.00/hr",
    image: BlueBoard,
  },
  {
    name: "FA",
    type: "",
    price: "$15.00/hr",
    image: PinkBoard,
    page: "Fa",
  },
  {
    name: "Krooked",
    type: "",
    price: "$16.00/hr",
    image: WhiteBlueBoard,
  },
  {
    name: "FA",
    type: "",
    price: "$16.00/hr",
    image: MosaicBoard,
  },
];

const pageMap = {
  [PinkBoard]: "Fa",
  [OrangeBoard]: "Orange",
  [PompomBoard]: "Pom",
};

function ProductCard({ item, onPress, likedItems, addLikeItem, removeLikeItem, showLikePopup, showRemovePopup, addRentalItem, showCartPopup }) {
  const liked = likedItems.some((i) => i.type === item.type);

  const handleLikeItem = () => {
    if (liked) {
      if (removeLikeItem) removeLikeItem(item);
      if (showRemovePopup) showRemovePopup();
    } else {
      if (addLikeItem) addLikeItem(item);
      if (showLikePopup) showLikePopup();
    }
  };

  const handleAddToCart = () => {
    if (addRentalItem) addRentalItem(item);
    if (showCartPopup) showCartPopup();
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} disabled={!onPress}>
      <Image
        source={item.image}
        style={styles.boardImage}
        resizeMode="contain"
      />
      <View style={styles.iconGroup}>
        <TouchableOpacity onPress={handleLikeItem}>
          <Ionicons name={liked ? "heart" : "heart-outline"} size={20} color={liked ? "red" : "black"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAddToCart}>
          <Ionicons name="cart-outline" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productType}>{item.type}</Text>
      <Text style={styles.price}>{item.price}</Text>
      {item.page ? <Text style={styles.viewDetails}>View Details</Text> : null}
    </TouchableOpacity>
  );
}

export default function Recommendation({ setPage, rentalCart, likedItems, addLikeItem, removeLikeItem, showLikePopup, showRemovePopup, addRentalItem, showCartPopup }) {
  const totalItems = rentalCart.reduce((sum, item) => sum + item.quantity, 0);
  const totalLiked = likedItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setPage("home")}
          >
            <Ionicons name="chevron-back" size={34} color="black" />
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => setPage("home")}
          >
            <Image
              source={Logo}
              style={styles.logo}
              resizeMode="contain"
            />
          </TouchableOpacity>
         
        

          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="menu" size={28} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Recommendations</Text>

      <View style={styles.grid}>
        {items.map((item, index) => (
        <ProductCard
  key={index}
  item={item}
  onPress={item.page ? () => setPage(item.page) : undefined}
  likedItems={likedItems}
  addLikeItem={addLikeItem}
  removeLikeItem={removeLikeItem}
  showLikePopup={showLikePopup}
  showRemovePopup={showRemovePopup}
  addRentalItem={addRentalItem}
  showCartPopup={showCartPopup}
/>
      ))}
      </View>
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

  scroll: {
    paddingBottom: 100,
  },

  header: {
    height: 110,
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 28,
    color: DARK,
    fontWeight: "bold",
    fontFamily: "serif",
    textAlign: "center",
    marginBottom: 44,
    paddingTop:20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 22,
    justifyContent: "space-between",
  },

  card: {
    width: "31%",
    alignItems: "center",
    marginBottom: 88,
    minHeight: 285,
  },

  boardImage: {
    width: 92,
    height: 178,
  },

  iconGroup: {
    position: "absolute",
    right: -2,
    top: 152,
    alignItems: "center",
  },

  productName: {
    marginTop: 12,
    color: DARK,
    fontSize: 15,
    lineHeight: 16,
    textAlign: "center",
    fontFamily: "serif",
  },

  productName: {
  marginTop: 12,
  color: DARK,
  fontSize: 12,     
  lineHeight: 14,   
  textAlign: "center",
  fontFamily: "serif",
},

productType: {     
  color: DARK,
  textAlign: "center",
  fontFamily: "serif",
  fontSize: 10,
  marginTop: 2,
},

price: {
  marginTop: 14,
  color: DARK,
  fontSize: 11,      
  textAlign: "center",
  fontFamily: "serif", 
},

  price: {
    marginTop: 14,
    color: DARK,
    fontSize: 16,
    textAlign: "center",
  },

  viewDetails: {
    marginTop: 8,
    color: DARK,
    fontSize: 13,
    textAlign: "center",
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
});