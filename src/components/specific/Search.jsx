import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Skeleton,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLazySearchUsersQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { setIsSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";
import { toast } from "react-hot-toast";
import { useAsyncMutation } from "../../hooks/hook";

const Search = () => {
  const search = useInputValidation("");

  const dispatch = useDispatch();
  const { isSearch } = useSelector((state) => state.misc);
  const [sendFriendRequest, isLoadingSendFriendReq] = useAsyncMutation(
    useSendFriendRequestMutation
  );

  const [searchUser] = useLazySearchUsersQuery();

  const [users, setUsers] = useState([]);
  const addFriendHandler = async (id) => {
    await sendFriendRequest("Sending friend request...", { userId: id });
  };

  const searchCloseHandler = () => dispatch(setIsSearch(false));

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((err) => console.log(err));
    }, 500);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value]);
  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"1.7rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People's</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users.length ? (
            users.map((i) => (
              <UserItem
                user={i}
                key={i._id}
                handler={addFriendHandler}
                handlerIsLoading={isLoadingSendFriendReq}
              ></UserItem>
            ))
          ) : (
            <Skeleton />
          )}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
