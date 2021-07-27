import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  makeStyles,
  Avatar,
} from "@material-ui/core";
import { DeleteOutlined } from "@material-ui/icons";
import { blue, green, pink, yellow } from "@material-ui/core/colors";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: (note) => {
      if (note.category === "work") {
        return yellow[700];
      }
      if (note.category === "money") {
        return green[500];
      }
      if (note.category === "todos") {
        return pink[500];
      }
      return blue[500];
    },
  },
});

export default function NoteCard({ expense }) {
  const classes = useStyles(expense);
  return (
    <div>
      <Card elevation={2}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {expense.category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton>
              <DeleteOutlined />
            </IconButton>
          }
          title={expense.title}
          subheader={expense.category}
        />
        <CardContent>
          <Typography variants="body2" color="textSecondary">
            {expense.amount}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
