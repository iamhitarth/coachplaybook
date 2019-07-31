import * as React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import styled from "styled-components/native";

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
      "Get the client to draw a line in the middle of the page and write the Energy Providers on one side and Energy Drainers on the other. Work on making the Providers list longer than Drainers. Then work on coming up with an approach to counter each and every one of the Drainers and turn it into a Provider."
  }
];

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  padding: 50px 15px 10px 15px;
`;

const H1 = styled.Text`
  font-size: 32px;
  font-weight: 700;
`;

const PlayCard = styled.View`
  background-color: #eee;
  margin: 10px 0;
  padding: 10px;
`;

const H3 = styled.Text`
  font-weight: bold;
  padding: 5px 0;
`;

const CopyText = styled.Text``;

export default class App extends React.Component {
  render() {
    return (
      <Container>
        <H1>Coaching Plays</H1>
        <FlatList
          data={plays}
          keyExtractor={play => play.id.toString()}
          renderItem={({ item: play }) => (
            <PlayCard>
              <H3>{play.title}</H3>
              <CopyText>{play.description}</CopyText>
            </PlayCard>
          )}
        />
      </Container>
    );
  }
}
