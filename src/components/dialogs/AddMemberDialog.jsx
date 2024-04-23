import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useAsyncMutation, useErrors } from "../../hooks/hook";
import {
  useAddGroupMembersMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/misc";

const AddMemberDialog = ({ chatId, isAddMember }) => {
  const dispatch = useDispatch();

  const [selectedMembers, setSelectedMembers] = useState([]);

  const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId);

  const [addMember, isLoadingAddMember] = useAsyncMutation(
    useAddGroupMembersMutation
  );

  const selectMemberHandler = (id) => {
    setSelectedMembers((prevState) =>
      prevState.includes(id)
        ? prevState.filter((currentElement) => currentElement !== id)
        : [...prevState, id]
    );
  };

  const closeHandler = () => {
    dispatch(setIsAddMember(false));
  };
  const addMemberSubmitHandler = () => {
    addMember("Adding Members...", { members: selectedMembers, chatId });
    closeHandler();
  };

  useErrors([{ isError, error }]);

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"1.5rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>

        <Stack spacing={"1.5rem"}>
          {isLoading ? (
            <Skeleton />
          ) : data?.friends?.length > 0 ? (
            data?.friends?.map((user, index) => {
              return (
                <UserItem
                  key={user._id}
                  user={user}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(user._id)}
                />
              );
            })
          ) : (
            <Typography textAlign={"center"}>
              No Friends You are Lonely:)
            </Typography>
          )}
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Button variant="outlined" onClick={closeHandler} color="error">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={addMemberSubmitHandler}
            disabled={isLoadingAddMember}
          >
            Submit Changes
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
