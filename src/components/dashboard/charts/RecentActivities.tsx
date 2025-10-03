import React from "react";
import { mockActivities } from "../../../mocks/data";
import type { RecentActivity } from "../../../types";
import {
  UsersIcon,
  BanknotesIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
} from "../../shared/Icons";

const iconMap: {
  [key in RecentActivity["type"]]: React.ComponentType<{ className?: string }>;
} = {
  "New Client": UsersIcon,
  "Deal Update": BanknotesIcon,
  "Site Visit": CalendarDaysIcon,
  "Task Assigned": BriefcaseIcon,
};

const iconColorMap: { [key in RecentActivity["type"]]: string } = {
  "New Client": "bg-blue-500/20 text-blue-400",
  "Deal Update": "bg-yellow-500/20 text-yellow-400",
  "Site Visit": "bg-indigo-500/20 text-indigo-400",
  "Task Assigned": "bg-pink-500/20 text-pink-400",
};

const RecentActivities: React.FC = () => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-lg h-full">
      <h3 className="text-xl font-semibold mb-4 text-text-primary">
        Recent Activities
      </h3>
      <ul className="space-y-4">
        {mockActivities.map((activity) => {
          const Icon = iconMap[activity.type];
          const iconColor = iconColorMap[activity.type];
          return (
            <li key={activity.id} className="flex items-start space-x-4">
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${iconColor}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-text-primary">
                  <span className="font-semibold">{activity.user}</span>{" "}
                  {activity.type === "New Client" ||
                  activity.type === "Site Visit"
                    ? ""
                    : "updated a"}{" "}
                  {activity.description}
                </p>
                <p className="text-xs text-text-secondary mt-0.5">
                  {activity.timestamp}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecentActivities;
