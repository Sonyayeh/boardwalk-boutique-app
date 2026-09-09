import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";

import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

const BLUE = "#C8D4EE";
const DARK = "#12345C";
const WHITE = "#FFFFFF";

import Logo from "./assets/skateboards/logo.png";
import { BottomTabBarHeightCallbackContext } from "@react-navigation/bottom-tabs";

export default function Review({ setPage }) {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setPage("Fa")}
        >
          <Ionicons name="chevron-back" size={34} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPage("home")}>
          <Image source={Logo} style={styles.logo} resizeMode="contain" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={34} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View>
          <Text style={styles.reviewHeader}>Reviews:</Text>
          <Text style={styles.writeAreview}> Write a Review</Text>

          <View style={styles.reviewCard}>
            <View style={styles.reviewStars}>
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Text style={styles.reviewName}>James .L</Text>
            </View>
            <Text style={styles.reviewText}>
              I love Boardwalk Boutique. All of their boards are the highest quality
              in town. Employees are super nice and chill, and my online orders and
              rentals are always on time.
            </Text>
          </View>

          <View style={styles.reviewCard}>
            <View style={styles.reviewStars}>
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Text style={styles.reviewName}>Daniel K</Text>
            </View>
            <Text style={styles.reviewText}>
              This is my first time renting from Broadway Boutique. My buddy, Vahan,
              recommended me here when I told him I wanted to learn skateboarding.
              This FA deck is most likely my all time favorite board to cruise
              around. Style is slick and it's super beginner-friendly.
            </Text>
          </View>
        </View>


          <View style={styles.reviewCard}>
            <View style={styles.reviewStars}>
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Text style={styles.reviewName}>Karleil V</Text>
            </View>
            <Text style={styles.reviewText}>
               I brought my cousins to skateboard and she chose this board. The staffs were super nice to adjust the wheels for us and recommended us some gears. 
            </Text>
          </View>
        

          <View style={styles.reviewCard}>
            <View style={styles.reviewStars}>
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Text style={styles.reviewName}>Courtney Y</Text>
            </View>
            <Text style={styles.reviewText}>
              I wanted to rent the Pompompurin Girl Skateboard but this was the only option left, and honestly, I’m glad I rented this deck instead. The graphics are very abstracted and goes well with my outfit that day!
            </Text>
          </View>


          <View style={styles.reviewCard}>
            <View style={styles.reviewStars}>
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Text style={styles.reviewName}>Sonya Y</Text>
            </View>
            <Text style={styles.reviewText}>
              I didn’t remember how to skateboard anymore and was worried I may fall easily. Luckily, the staffs recommended me this board because it was beginner friendly. I did fall a few times, but overall I enjoyed it.
            </Text>
          </View>


          <View style={styles.reviewCard}>
            <View style={styles.reviewStars}>
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Ionicons name="star" size={16} color="#F5B400" />
              <Text style={styles.reviewName}>Vahan G</Text>
            </View>
            <Text style={styles.reviewText}>
              They said I could get 10% off if I leave a review.
            </Text>
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

header: {
  height: 110,
  backgroundColor: BLUE,
  alignItems: "center",
  justifyContent: "center",
},

backButton: {
  position: "absolute",
  left: 24,
  top: 30,
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

  screen: {
    flex: 1,
    backgroundColor: BLUE,
  },

  scrollContent:{
    paddingBottom: 80,
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

  reviewCard: {
  backgroundColor: "#fff",
  borderWidth: 1,
  borderColor: "#8EA7DC",
  borderRadius: 10,
  padding: 16,
  marginBottom: 16,
  width: "90%",
  alignSelf: "center",
},

reviewStars: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 8,
},

reviewName: {
  marginLeft: 6,
  fontSize: 14,
  color: DARK,
},

reviewHeader: {
    fontSize: 28,
    color: DARK,
    fontWeight: "bold",
    fontFamily: "serif",
    textAlign: "center",
    paddingHorizontal: 24,
    marginVertical: 18,
    paddingTop: 10,
  },

writeAreview: {
    fontSize: 16,
    color: DARK,
    textDecorationLine: "underline",
    textAlign:"center",
    paddingBottom: 20
},

})