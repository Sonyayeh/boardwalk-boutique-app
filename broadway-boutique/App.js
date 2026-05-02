import { Ionicons } from "@expo/vector-icons";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import BlueBoard from "./assets/skateboards/blueboard.png";
import OrangeBoard from "./assets/skateboards/orangeskateboard.png";
import PompomBoard from "./assets/skateboards/pompomboard.png";

import Helmet from "./assets/skateboards/helmet.png";
import Socks from "./assets/skateboards/socks.png";
import Tshirt from "./assets/skateboards/tshirt.png";

import AboutUs from "./assets/skateboards/aboutus.png";
import Banner from "./assets/skateboards/banner.png";
import Logo from "./assets/skateboards/logo.png";
import Map from "./assets/skateboards/map.png";

const BLUE = "#C8D4EE";
const DARK = "#12345C";
const BUTTON_BLUE = "#8EA7DC";

const brands = [
  "Santa Cruz",
  "Anti Hero",
  "Enjoi",
  "Baker",
  "Powell\nPeralta",
  "Toy Machine",
  "Birdhouse",
  "Girl\nSkateboards",
  "Deathwish",
];

const rentalItems = [
  {
    name: "Girl Skateboards",
    type: "Sketchy Board",
    price: "$4.00/hr",
    image: OrangeBoard,
  },
  {
    name: "Girl Skateboards",
    type: "Rickk Howard",
    price: "$5.00/hr",
    image: PompomBoard,
  },
  {
    name: "Dustin Henry",
    type: "1995 Graphic",
    price: "$6.00/hr",
    image: BlueBoard,
  },
];

const shopItems = [
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

function ProductCard({ item, shop }) {
  return (
    <View style={styles.card}>
      <View style={shop ? styles.shopImage : styles.boardImage}>
        <Image
          source={item.image}
          style={shop ? styles.realShopItem : styles.realBoard}
          resizeMode="contain"
        />

        <View style={styles.icons}>
          <Ionicons name="heart-outline" size={18} />
          <Ionicons name="cart-outline" size={18} />
        </View>
      </View>

      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productType}>{item.type}</Text>
      <Text style={styles.price}>{item.price}</Text>

      {!shop && <Text style={styles.details}>View Details</Text>}
    </View>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Image source={Logo} style={styles.logoImage} resizeMode="contain" />
          <Ionicons name="menu" size={28} style={styles.menu} />
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Shop</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Rental</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.hero}>
          <Image source={Banner} style={styles.bannerImage} resizeMode="cover" />

          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Summer Discount</Text>

            <Text style={styles.heroText}>
              Up to 15% off on selected items in our boutique!
            </Text>

            <Text style={styles.shopNow}>Shop Now</Text>
          </View>
        </View>

        <View style={styles.brandSection}>
          <Text style={styles.sectionTitle}>Featured Brands</Text>

          <View style={styles.brandGrid}>
            {brands.map((brand) => (
              <View key={brand} style={styles.brandButton}>
                <Text style={styles.brandText}>{brand}</Text>
              </View>
            ))}
          </View>
        </View>

        <Section title="Recommendations">
          <View style={styles.row}>
            {rentalItems.map((item) => (
              <ProductCard key={item.type} item={item} />
            ))}
          </View>
          <Text style={styles.more}>More...</Text>
        </Section>

        <Section title="Our Shop">
          <View style={styles.row}>
            {shopItems.map((item) => (
              <ProductCard key={item.type} item={item} shop />
            ))}
          </View>
          <Text style={styles.more}>More...</Text>
        </Section>

        <Section title="Liked Items">
          <View style={styles.row}>
            {rentalItems.map((item) => (
              <ProductCard key={item.type} item={item} />
            ))}
          </View>
          <Text style={styles.more}>More...</Text>
        </Section>

        <Section title="Recently Viewed">
          <View style={styles.row}>
            {rentalItems.map((item) => (
              <ProductCard key={item.type} item={item} />
            ))}
          </View>
        </Section>

        <Text style={styles.sectionTitle}>About Us</Text>

        <View style={styles.about}>
          <Text style={styles.aboutText}>
            Located in the heart of Vancouver, BC, Boardwalk Boutique is the
            go-to destination for skaters and streetwear enthusiasts.
          </Text>

          <Image source={AboutUs} style={styles.aboutImage} resizeMode="cover" />
        </View>

        <View style={styles.location}>
          <Text style={styles.sectionTitle}>Our Location</Text>

          <Image source={Map} style={styles.mapImage} resizeMode="cover" />
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        <Ionicons name="home-outline" size={22} />
        <Ionicons name="cart-outline" size={22} />
        <Ionicons name="add-circle-outline" size={22} />
        <Ionicons name="heart-outline" size={22} />
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
    paddingBottom: 70,
  },

  header: {
    height: 110,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
  },

  logoImage: {
    width: 170,
    height: 80,
  },

  menu: {
    position: "absolute",
    right: 24,
    top: 30,
  },

  tabs: {
    flexDirection: "row",
    backgroundColor: "white",
    height: 42,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: "#C8D4EE",
  },

  tabText: {
    fontSize: 22,
    color: "#85A0D8",
    fontFamily: "serif",
  },

  hero: {
    height: 140,
    backgroundColor: "white",
    position: "relative",
    overflow: "hidden",
  },

  bannerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  heroOverlay: {
    height: "100%",
    padding: 20,
    justifyContent: "center",
  },

  heroTitle: {
    color: DARK,
    fontWeight: "bold",
    fontFamily: "serif",
  },

  heroText: {
    color: DARK,
    width: 155,
    marginTop: 8,
    fontWeight: "bold",
    fontFamily: "serif",
    lineHeight: 16,
  },

  shopNow: {
    position: "absolute",
    right: 28,
    bottom: 40,
    color: "#B00000",
    fontWeight: "bold",
    fontFamily: "serif",
  },

  brandSection: {
    backgroundColor: "white",
    padding: 18,
  },

  section: {
    paddingVertical: 36,
    paddingHorizontal: 18,
  },

  sectionTitle: {
    color: DARK,
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "serif",
    marginBottom: 25,
  },

  brandGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },

  brandButton: {
    backgroundColor: BUTTON_BLUE,
    width: "30%",
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  brandText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
    fontFamily: "serif",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  card: {
    width: "30%",
    alignItems: "center",
  },

  boardImage: {
    height: 135,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  shopImage: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  realBoard: {
    width: 70,
    height: 130,
  },

  realShopItem: {
    width: 80,
    height: 80,
  },

  icons: {
    position: "absolute",
    right: 2,
    bottom: 8,
    gap: 2,
  },

  productName: {
    color: DARK,
    textAlign: "center",
    fontFamily: "serif",
    fontSize: 12,
    lineHeight: 14,
  },

  productType: {
    color: DARK,
    textAlign: "center",
    fontFamily: "serif",
    fontSize: 10,
    marginTop: 2,
  },

  price: {
    color: DARK,
    textAlign: "center",
    fontFamily: "serif",
    fontSize: 11,
    marginTop: 5,
  },

  details: {
    color: DARK,
    textAlign: "center",
    fontFamily: "serif",
    fontSize: 10,
    marginTop: 8,
  },

  more: {
    textAlign: "right",
    marginTop: 28,
    textDecorationLine: "underline",
    fontSize: 11,
  },

  about: {
    height: 240,
    backgroundColor: "#020713",
    padding: 24,
    justifyContent: "center",
    overflow: "hidden",
  },

  aboutText: {
    color: "white",
    width: "48%",
    fontSize: 11,
    textAlign: "center",
    lineHeight: 15,
    fontFamily: "serif",
    zIndex: 2,
  },

  aboutImage: {
    position: "absolute",
    right: 0,
    width: "65%",
    height: "100%",
  },

  location: {
    backgroundColor: "white",
    paddingTop: 22,
  },

  mapImage: {
    width: "100%",
    height: 190,
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
});