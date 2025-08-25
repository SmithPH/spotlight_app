import { STORIES_mock_data } from "@/constants/mock-data";
import { ScrollView } from "react-native";
import Story from "./Story";

const StoriesSection = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {STORIES_mock_data.map((story) => (
        <Story key={story.id} story={story} />
      ))}
    </ScrollView>
  );
};

export default StoriesSection;
