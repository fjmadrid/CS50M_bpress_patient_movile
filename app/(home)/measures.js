import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  InnerContainer,
  StyledContainer,
  StyledButton,
  StyledButtonText,
  Line,
} from "../../src/components/styled";

import { api_fetchMeasurements } from "../../src/api/api";

import { Colors } from "../../src/components/styled";
import { useState } from "react";

const { primary } = Colors;

export default function MeasuresScreen() {
  const [measurements, setMeasurements] = useState([]);

  const fetchMeasurements = async () => {
    let measurements = [];
    let page = 1;
    let resp = null;

    try {
      do {
        resp = await api_fetchMeasurements(page);
        console.log(`Response for page ${page}: `, JSON.stringify(resp));
        if (resp.status === 200) {
          measurements = measurements.concat(resp.data.results);
          page = page + 1;
        } else {
          console.log(
            "Error fetching patient measures.",
            ` Response ${resp.status}: ${resp.error}`
          );
        }
      } while (resp.data.next);
    } catch (error) {
      console.log(`Exception fetching patient measures: ${error}`);
    }
    setMeasurements(measurements);
  };

  useState(() => {
    if (measurements.length === 0) fetchMeasurements();
  }, [measurements]);

  console.log(
    `In measurements screen. Number of measurements is ${measurements.length}`
  );
  return (
    <StyledContainer>
      <InnerContainer>
        <StyledButton>
          <StyledButtonText>
            <FontAwesome size={32} color={primary} name="plus" />
          </StyledButtonText>
        </StyledButton>
        <Line />
      </InnerContainer>
    </StyledContainer>
  );
}
