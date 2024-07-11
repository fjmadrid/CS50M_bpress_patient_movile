import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  InnerContainer,
  StyledContainer,
  MessagesContainer,
  StyledButton,
  StyledButtonText,
  Line,
  MsgBox,
  LeftIcon,
  StyledTextInput,
  RightIcon,
  MessageTextInput,
} from "../../src/components/styled";

import { Colors } from "../../src/components/styled";
import {
  selectMessagesStatus,
  selectMessagesError,
  fetchMessages,
  selectMessageById,
  selectMessagesIds,
  addNewMessage,
  resetMessages,
} from "../../src/state/messagesSlice";
import { selectPatientId } from "../../src/state/patientSlice";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { api_sendMessage } from "../../src/api/api";

import moment from "moment";

const { primary, brand, darkLight } = Colors;

const Measurement = ({ id, patientId }) => {
  const item = useSelector((state) => selectMessageById(state, id));
  const dateStr = moment(item.date).fromNow();
  return (
    <View
      style={{
        width: "75%",
        marginTop: 10,
        padding: 10,
        backgroundColor: "beige",
        borderColor: brand,
        borderWidth: 2,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: item.origin === patientId ? 10 : 0,
        borderBottomRightRadius: item.origin === patientId ? 0 : 10,
        alignSelf: item.origin === patientId ? "flex-end" : "flex-start",
      }}
    >
      <View style={{ alignItems: "flex-end" }}>
        <Text>{dateStr}</Text>
      </View>
      <View>
        <Text>{item.text}</Text>
      </View>
    </View>
  );
};

export default function MessagesScreen() {
  const messagesStatus = useSelector(selectMessagesStatus);
  const messagesError = useSelector(selectMessagesError);
  const messagesIds = useSelector(selectMessagesIds);
  const patientId = useSelector(selectPatientId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (messagesIds.length === 0 && messagesStatus === "idle") {
      console.log("Dispatching action to fetch measurements.");
      dispatch(fetchMessages());
    }
  }, [dispatch, messagesIds, messagesStatus]);

  console.log(
    `In messages screen. Number of messages is ${messagesIds.length} Messages status: ${messagesStatus}`
  );

  let content = null;
  if (messagesStatus === "loading")
    content = <ActivityIndicator size="large" />;
  else if (messagesStatus === "failed")
    content = <MsgBox>{messagesError}</MsgBox>;
  else {
    content = (
      <FlatList
        data={messagesIds}
        renderItem={({ item }) => (
          <Measurement id={item} patientId={patientId} />
        )}
        keyExtractor={(item) => item}
      />
    );
  }

  return (
    <StyledContainer>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Doctor</Text>
        <Text>Patient</Text>
      </View>
      <MessagesContainer>{content}</MessagesContainer>
      <Line />
      <NewMessage />
    </StyledContainer>
  );
}

const NewMessage = () => {
  const dispatch = useDispatch();
  const [messageText, setMessageText] = useState("");
  const [sendStatus, setSendStatus] = useState("idle");
  const [sendError, setSendError] = useState("");

  const handleSend = async (text) => {
    if (text !== "" && sendStatus !== "pending") {
      console.log(`In messages screen, sending a message: "${text}"`);
      setSendStatus("pending");
      try {
        const resp = await api_sendMessage(text);
        console.log(
          console.log(
            `In messages screen, sending a message response: "${JSON.stringify(
              resp
            )}"`
          )
        );
        const { status, statusText, data } = resp;
        if (status !== 201) {
          console.log(
            "Error sending a message: ",
            `Response ${status}: ${statusText}`
          );
          setSendStatus("failed");
          setSendError(`Response ${status}: ${statusText}`);
        } else {
          dispatch(addNewMessage(data));
          setSendStatus("succeeded");
        }
      } catch (err) {
        setSendError(err?.message ? err.message : "network error");
        setSendStatus("failed");
      }
    }
  };

  const handleRefresh = () => {
    dispatch(resetMessages());
  };

  return (
    <View>
      {sendStatus === "failed" ? <MsgBox>{sendError}</MsgBox> : null}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <StyledButton onPress={() => handleSend(messageText)}>
          <FontAwesome name={"paper-plane"} size={20} color={primary} />
        </StyledButton>
        <MessageTextInput
          onChangeText={(value) => setMessageText(value)}
          value={messageText}
          placeholder="Write down a new message."
          placeholderTextColor={darkLight}
        />
        <StyledButton onPress={handleRefresh}>
          <FontAwesome name={"refresh"} size={20} color={primary} />
        </StyledButton>
      </View>
    </View>
  );
};
