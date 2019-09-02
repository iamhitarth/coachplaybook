import * as React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import Fuse from "fuse.js";

/* TODO
Reset list scroll position on changing of search text
 */

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
  font-size: 20px;
  font-weight: bold;
  padding: 5px 0;
`;

const CopyText = styled.Text`
  font-size: 20px;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  background-color: #fff;
  padding-bottom: 10px;
`;

const SearchBox = styled.TextInput`
  font-size: 20px;
  border: solid 1px #aaa;
  border-radius: 8px;
  padding: 10px;
  flex: 1;
`;

const ClearSearchButton = styled.TouchableOpacity`
  padding: 10px;
`;

const ButtonText = styled.Text`
  font-size: 30px;
`;

type Play = {
  id: number;
  title: string;
  description: string;
  tags: Array<string>;
};

type AppState = {
  isLoading: boolean;
  plays: Array<Play>;
  searchText: string;
};

let fuse: Fuse<Array<Play>>;
const searchOptions: Fuse.FuseOptions<Play> = {
  keys: [
    { name: "title", weight: 0.5 },
    { name: "description", weight: 0.2 },
    { name: "tags", weight: 0.3 }
  ],
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1
};

export default class App extends React.Component<null, AppState> {
  state: AppState = {
    isLoading: true,
    plays: [],
    searchText: ""
  };

  fetchPlays = (query?: string) => {
    this.setState({ isLoading: true }, () => {
      fetch(
        `http://gsx2json.com/api?id=1wEzLj6TVkeU5z82LmRrLeztlzciG0nCJlEvrG2yDpms&sheet=1${
          query ? `&q=${query}` : ""
        }`
      )
        .then(response => response.json())
        .then(result => {
          const plays = result.rows;
          this.setState({ plays, isLoading: false });
          fuse = new Fuse(plays, searchOptions);
        });
    });
  };

  onSearchTextChange = (text: string) => {
    this.setState({
      ...this.state,
      searchText: text,
      plays: text ? fuse.search(text) : fuse.list
    });
  };

  componentDidMount() {
    this.fetchPlays();
  }

  render() {
    const { isLoading, plays } = this.state;
    return (
      <Container>
        <H1>Coaching Plays</H1>
        <FlatList
          style={{ width: "100%" }}
          data={plays}
          keyExtractor={play => play.id.toString()}
          refreshing={isLoading}
          onRefresh={this.fetchPlays}
          renderItem={({ item: play }) => {
            const { id, title, description } = play;
            return (
              <PlayCard>
                <H3>
                  #{id} {title}
                </H3>
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
            isLoading ? null : (
              <CopyText style={{ textAlign: "center" }}>
                No plays found in this playbook :(
              </CopyText>
            )
          }
          ListHeaderComponent={
            <SearchContainer>
              <SearchBox
                placeholderTextColor={"#aaa"}
                placeholder={"Search here..."}
                value={this.state.searchText}
                onChangeText={this.onSearchTextChange}
              />
              <ClearSearchButton onPress={() => this.onSearchTextChange("")}>
                <ButtonText>X</ButtonText>
              </ClearSearchButton>
            </SearchContainer>
          }
          stickyHeaderIndices={[0]}
        />
      </Container>
    );
  }
}
