import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Animated,
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
import Helmet from "./assets/skateboards/helmet.png";
import Socks from "./assets/skateboards/socks.png";
import Tshirt from "./assets/skateboards/tshirt.png";

const BLUE = "#C8D4EE";
const DARK = "#12345C";

const clothes = [
    {
    name: "Thrasher",
    type: "Goat Socks",
    price: "$15.00",
    image: Socks,
  },
    {
    name: "Bronze",
        type: "Ranch Tee Navy",
        price: "$34.00",
        image: Tshirt,
  },
    {
    name: "TSG",
        type: "Evolution Helmet",
        price: "$85.99",
        image: Helmet,
  },
];

const items = [
  {
    name: "Girl\nSkateboard",
    detail: "Standard",
    price: "$4.00/hr",
    image: OrangeBoard,
    page: "Orange",
  },
  {
    name: "Girl\nSkateboard",
    detail: "PomPomPurin",
    price: "$5.00/hr",
    image: PompomBoard,
    page: "Pom",
  },
  {
    name: "FA",
    detail: "The Pink Board",
    price: "$15.00/hr",
    image: PinkBoard,
    page: "Fa",
  },
  {
    name: "Dustin\nHenry",
    detail: "",
    price: "$6.00/hr",
    image: BlueBoard,
  },
  {
    name: "Krooked",
    detail: "",
    price: "$16.00/hr",
    image: WhiteBlueBoard,
  },
  {
    name: "FA",
    detail: "",
    price: "$16.00/hr",
    image: MosaicBoard,
  },
];

function ProductCard({ item, onPress, addLikeItem, showLikePopup }) {
  const [liked, setLiked] = useState(false);

  const handleLikeItem = () => {
    if (addLikeItem) addLikeItem(item);
    if (showLikePopup) showLikePopup();
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} disabled={!onPress}>
      <Image
        source={item.image}
        style={styles.boardImage}
        resizeMode="cover"
      />
      <View style={styles.iconGroup}>
        <TouchableOpacity onPress={() => {
            setLiked(!liked);
            handleLikeItem();
          }}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={20}
            color={liked ? "red" : "black"}
          />
        </TouchableOpacity>
        <Ionicons name="cart-outline" size={20} color="black" />
      </View>
      <Text style={styles.productName}>{item.name}</Text>
{item.detail ? <Text style={styles.detail}>{item.detail}</Text> : <View style={{ height: 34 }} />}
<Text style={styles.price}>{item.price}</Text>
{item.page && !item.detail ? <Text style={styles.viewDetails}>View Details</Text> : null}
    </TouchableOpacity>
  );
}

export default function Shop({ setPage, rentalCart, likedItems, addLikeItem }) {
  const totalItems = rentalCart.reduce((sum, item) => sum + item.quantity, 0);
  const totalLiked = likedItems.reduce((sum, item) => sum + item.quantity, 0);
  const likeFadeAnim = useState(new Animated.Value(0))[0];

  const showLikePopup = () => {
    Animated.sequence([
      Animated.timing(likeFadeAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
      Animated.delay(1200),
      Animated.timing(likeFadeAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start();
  };

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

          <TouchableOpacity onPress={() => setPage("home")}>
            <Image source={Logo} style={styles.logo} resizeMode="contain" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuButton}>
            <Ionicons name="menu" size={28} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}> Boardwalk Shop:</Text>
        <Text style={styles.sub}>Popular Rental Boards:</Text>

       <View style={styles.grid}>
          {items.map((item, index) => (
            <ProductCard
              key={index}
              item={item}
              onPress={item.page ? () => setPage(item.page) : undefined}
              addLikeItem={addLikeItem}
              showLikePopup={showLikePopup}
            />
          ))}
        </View>

        <Text style={styles.sub}>Hottest Apparels:</Text>

       <View style={styles.grid}>
          {clothes.map((item, index) => (
            <ProductCard
              key={index}
              item={item}
              onPress={undefined}
              addLikeItem={addLikeItem}
              showLikePopup={showLikePopup}
            />
          ))}
        </View>
      </ScrollView>

      <Animated.View
  pointerEvents="none"
  style={[
    styles.screenPopup,
    {
      opacity: likeFadeAnim,
    },
  ]}
>
  <View style={styles.popupBox}>
    <Text style={styles.centerPopupText}>Added to Favourites!</Text>
  </View>
</Animated.View>

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

  logo: {
    width: 170,
    height: 80,
  },

  menuButton: {
    position: "absolute",
    right: 24,
    top: 30,
  },


  title: {
    fontSize: 31,
    color: DARK,
    fontWeight: "bold",
    fontFamily: "serif",
    textAlign: "center",
    marginBottom: 40,
  },
  sub: {
    fontSize: 20,
    color: DARK,
    fontFamily: "serif",
    textAlign: "center",
    marginBottom: 20,
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
    width: 60,
    height: 150,
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
  height: 32,
  textAlign: "center",
  fontFamily: "serif",
},

  detail: {
    marginTop: 22,
    color: DARK,
    fontSize: 9,
    lineHeight: 12,
    textAlign: "center",
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
screenPopup: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
},

popupBox: {
  backgroundColor: "rgba(70,70,70,0.92)",
  paddingVertical: 14,
  paddingHorizontal: 24,
  borderRadius: 14,
},

centerPopupText: {
  color: "white",
  fontSize: 14,
  fontWeight: "600",
},
});