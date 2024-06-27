import {
  InnerContainer,
  MsgBox,
  StyledContainer,
} from "../../../src/components/styled";

import { useLocalSearchParams } from "expo-router";

export default function MeasurementDetailsScreen() {
  const { id } = useLocalSearchParams();
  return (
    <StyledContainer>
      <InnerContainer>
        <MsgBox>Details for measurement id:{id}</MsgBox>
      </InnerContainer>
    </StyledContainer>
  );
}
