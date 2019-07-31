import * as React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

const plays = [
  {
    id: 1,
    title: "Uncover strengths",
    description:
      "Focus on uncovering the strengths of the client by asking them about the times when they thought did really well and got the result they desired. Get them to describe what that felt like and what abilities of theirs did they use to get through that."
  },
  {
    id: 2,
    title: "Friend and Foe",
    description:
      "Get the client to talk about how a friend would describe them vs how a foe would describe them. This will give you a good idea of how the client perceives themselevs. Can be then paired up with an actual 360 feedback exercise."
  },
  {
    id: 3,
    title: "Energy Audit",
    description:
      "Get the clietn to draw a line in the middle of the page and write the Energy Providers on one side and Energy Drainers on the other. Work on making the Providers list longer than Drainers. Then work on coming up with an approach to counter each and every one of the Drainers and turn it into a Provider."
  }
];

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 32 }}>Coaching Plays</Text>
        <FlatList
          data={plays}
          keyExtractor={play => play.id.toString()}
          renderItem={({ item: play }) => (
            <View>
              <Text style={{ fontWeight: "bold" }}>{play.title}</Text>
              <Text>{play.description}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingLeft: 15,
    paddingRight: 15
  }
});
