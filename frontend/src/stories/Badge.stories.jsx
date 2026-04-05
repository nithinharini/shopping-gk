import Badge from "../components/common/badge";

export default {
  title: "Common/Badge",
  component: Badge,
};

export const Success = {
  args: {
    children: "In Stock",
    variant: "success",
  },
};

export const Warning = {
  args: {
    children: "Low Stock",
    variant: "warning",
  },
};

export const Danger = {
  args: {
    children: "Out of Stock",
    variant: "danger",
  },
};

export const Neutral = {
  args: {
    children: "New",
    variant: "neutral",
  },
};

export const Info = {
  args: {
    children: "Featured",
    variant: "info",
  },
};