import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Typography,
  } from "@mui/material";
  import FavoriteIcon from "@mui/icons-material/Favorite";
  import EditIcon from "@mui/icons-material/Edit";
  import CancelIcon from "@mui/icons-material/Cancel";
  
  import imaged from "../../assets/img/images.png";
  import Comments from "./Comments";
  import LeaveComment from "./LeaveComment";
  import { useDispatch, useSelector } from "react-redux";
  import {
    publishActor,
    likeActor,
    removeLikeActor,
    deleteActor,
  } from "../../actions/actor.action";
  import { actor, actorLike } from "../../utils/types";
  import { RootState } from "../../reducers";
  import { useHistory } from "react-router";
  
  interface Props {
    actorList: Array<actor>;
  }
  const ActorItem = ({ actorList }: Props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useSelector((state: RootState) => state.auth).user;
    const changePublishActorHandler = (
      actorId: number,
      publishValue: boolean
    ) => {
      dispatch(publishActor(actorId, publishValue));
    };
    const likeActorHandler = (actorId: number) => {
      dispatch(likeActor(actorId));
    };
    const removeLikeActorHandler = (actorId: number, likes: Array<actorLike>) => {
      const likeId: number = likes?.find((like) => like.user.id === id)?.id || 0;
      dispatch(removeLikeActor(actorId, likeId));
    };
    const updateActorHandler = (actor: actor) => {
      history.push({
        pathname: "/update-actor",
        state: actor,
      });
    };
    const deleteActorHandler = (actorId:number) => {
      let confirmAction = window.confirm("Are you sure to delete the actor?");
      if(confirmAction) {
          dispatch(deleteActor(actorId, "actor"))
      }
      
    }

    console.log("ActorList",actorList)
    return (
      <>
        {actorList.map((actor) => (
            <Card
            key={actor.id}
            sx={{ width: "85%", padding: "10px 20px", marginBottom: "50px" }}
          >
             <IconButton
              aria-label="add to favorites"
              onClick={() => deleteActorHandler(actor.id)}
              sx={{ float: "right" }}
            >
              <CancelIcon />
            </IconButton>
            <IconButton
              aria-label="add to favorites"
              onClick={() => updateActorHandler(actor)}
              sx={{ float: "right" }}
            >
              <EditIcon sx={{ color: "#1976d2" }} />
            </IconButton>
           
            <CardMedia
              component="img"
              height="140"
              image={imaged}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {actor.name + " " + actor.surname}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {actor.dateOfBirth}
              </Typography>
              <Box style={{ float: "left" }}>
                <Typography variant="subtitle1" color="text.secondary">
                  <strong>Gender: </strong> {actor.gender}
                </Typography>               
              </Box>
            </CardContent>
            <CardActions style={{ float: "right" }}>
              {actor.isPublished ? (
                <>
                  <Button
                    size="small"
                    onClick={() => changePublishActorHandler(actor.id, false)}
                  >
                    <strong>Hide This Post</strong>
                  </Button>
                  {actor?.likes?.filter((m) => m.user.id === id).length > 0 ? (
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() =>
                        removeLikeActorHandler(actor.id, actor.likes)
                      }
                    >
                      <FavoriteIcon sx={{ color: "red" }} />
                    </IconButton>
                  ) : (
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() => likeActorHandler(actor.id)}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  )}
                  {actor.likes.length > 0 ? `(${actor.likes.length})` : null}
                </>
              ) : (
                <Button
                  size="small"
                  onClick={() => changePublishActorHandler(actor.id, true)}
                >
                  <strong>Share</strong>
                </Button>
              )}
            </CardActions>
            {actor.isPublished ? (
              <>
                <Box>
                  <Comments postId={actor.id} list={actor.comments} commentsFor={"actor"} />
                </Box>
                <Box>
                  <LeaveComment id={actor.id} user={actor.user} leaveCommentFor={"actor"}/>
                </Box>
              </>
            ) : null}
          </Card>
        ))}
      </>
    );
  };
  
  export default ActorItem;
