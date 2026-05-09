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
    name: "Girl\nSkateboards",
    detail: "",
    price: "$4.00/hr",
    image: OrangeBoard,
  },
  {
    name: "Girl\nSkateboards",
    detail: "",
    price: "$5.00/hr",
    image: PompomBoard,
  },
  {
    name: "Dustin\nHenry",
    detail: "",
    price: "$6.00/hr",
    image: BlueBoard,
  },
  {
    name: "FA",
    detail: "Deck Store\nCollage",
    price: "$15.00/hr",
    image: PinkBoard,
  },
  {
    name: "Krooked",
    detail: "Pricepoint\nTrio 8.25\nSkateboard",
    price: "$16.00/hr",
    image: WhiteBlueBoard,
  },
  {
    name: "FA",
    detail: "Statue Deck",
    price: "$16.00/hr",
    image: MosaicBoard,
  },
];

function ProductCard({ item }) {
  return (
    <View style={styles.card}>
      <Image
        source={item.image}
        style={styles.boardImage}
        resizeMode="contain"
      />

      <View style={styles.iconGroup}>
        <Ionicons name="heart-outline" size={22} color="black" />
        <Ionicons name="cart-outline" size={22} color="black" />
      </View>

      <Text style={styles.productName}>{item.name}</Text>

      {item.detail ? (
        <Text style={styles.detail}>{item.detail}</Text>
      ) : null}

      <Text style={styles.price}>{item.price}</Text>

      {!item.detail ? (
        <Text style={styles.viewDetails}>View Details</Text>
      ) : null}
    </View>
  );
}

export default function Recommendation({ setPage }) {
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
            <Ionicons name="menu" size={34} color="black" />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Recommendations</Text>

        <View style={styles.grid}>
          {items.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <Ionicons name="home-outline" size={24} />
        <Ionicons name="cart-outline" size={24} />
        <Ionicons name="add-circle-outline" size={24} />
        <Ionicons name="heart-outline" size={24} />
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
    height: 190,
    alignItems: "center",
    justifyContent: "center",
  },

  backButton: {
    position: "absolute",
    left: 24,
    top: 48,
    zIndex: 2,
  },

  menuButton: {
    position: "absolute",
    right: 30,
    top: 48,
  },

  logo: {
    width: 210,
    height: 110,
    marginTop: 18,
  },

  title: {
    fontSize: 31,
    color: DARK,
    fontWeight: "bold",
    fontFamily: "serif",
    textAlign: "center",
    marginBottom: 44,
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
    fontSize: 17,
    lineHeight: 18,
    textAlign: "center",
    fontFamily: "serif",
  },

  detail: {
    marginTop: 22,
    color: DARK,
    fontSize: 11,
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
    fontSize: 15,
    textAlign: "center",
  },

  bottomNav: {
    position: "absolute",
    bottom: 0,
    height: 58,
    width: "100%",
    backgroundColor: "#E6E6E6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});