import * as React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import styled from "styled-components/native";

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
  margin-bottom: 15px;
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

type AppState = {
  isLoading: boolean;
  plays: Array<{
    id: number;
    title: string;
    description: string;
    tags: Array<string>;
  }>;
};

export default class App extends React.Component<null, AppState> {
  state: AppState = {
    isLoading: true,
    plays: []
  };

  componentDidMount() {
    fetch(
      "http://gsx2json.com/api?id=1wEzLj6TVkeU5z82LmRrLeztlzciG0nCJlEvrG2yDpms&sheet=1"
    )
      .then(response => response.json())
      .then(result => this.setState({ plays: result.rows, isLoading: false }));
  }

  render() {
    const { isLoading, plays } = this.state;
    return (
      <Container>
        <H1>Coaching Plays</H1>
        {isLoading ? (
          <CopyText>Loading...</CopyText>
        ) : (
          <FlatList
            data={this.state.plays}
            keyExtractor={play => play.id.toString()}
            renderItem={({ item: play }) => {
              const { title, description } = play;
              return (
                <PlayCard>
                  <H3>{title}</H3>
                  <CopyText>
                    {description.charAt
                      ? `${description
                          .charAt(0)
                          .toUpperCase()}${description.slice(1)}`
                      : "-"}
                  </CopyText>
                </PlayCard>
              );
            }}
            ListEmptyComponent={
              <CopyText>No plays found in this playbook :(</CopyText>
            }
          />
        )}
      </Container>
    );
  }
}
