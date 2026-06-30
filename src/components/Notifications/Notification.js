import React, { useEffect, useRef, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { db } from "../../firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Bell, X } from "lucide-react";
import "./Notification.css";
import { useLanguage } from "../../context/LanguageContext";
import { AuthContext } from "../../context/AuthContext";

export const Notification = ({
  isOpen,
  setOpenMenu,
  closeProfileMenu,
  closeMobileMenu,
}) => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showFullPage, setShowFullPage] = useState(false);
  const dropdownRef = useRef(null);
  const wrapperRef = useRef(null);
  const { t, language } = useLanguage();

  const isMobile = () => window.innerWidth <= 1024;

  useEffect(() => {
    const notifsCollection = collection(db, "notifications");
    const q = query(notifsCollection, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let notifs = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));

      if (user && user.email) {
        notifs = notifs.filter((n) => n.userEmail === user.email.toLowerCase());
      } else if (!user) {
        notifs = notifs.filter((n) => !n.userEmail);
      }

      setNotifications(notifs);
      setUnreadCount(notifs.filter((n) => !n.read).length);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setShowFullPage(false);
        document.body.classList.remove("notifications-open");
        document.body.style.overflow = "";
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showFullPage) {
      document.body.classList.add("notifications-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("notifications-open");
      document.body.style.overflow = "";
    }

    return () => {
      document.body.classList.remove("notifications-open");
      document.body.style.overflow = "";
    };
  }, [showFullPage]);

  const markVisibleAsRead = async () => {
    if (!dropdownRef.current) return;

    const items = dropdownRef.current.querySelectorAll(
      ".notification-item.unread",
    );

    for (const item of items) {
      const rect = item.getBoundingClientRect();

      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        const notifId = item.dataset.id;
        if (notifId) {
          const ref = doc(db, "notifications", notifId);
          await updateDoc(ref, { read: true });
        }
      }
    }
  };

  const handleDropdownOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();

    closeProfileMenu?.();

    if (isMobile()) {
      setShowFullPage(true);
      setOpenMenu(null);

      setTimeout(() => {
        closeMobileMenu?.();
      }, 0);

      return;
    }

    setOpenMenu((prev) => {
      const nextValue = prev === "notifications" ? null : "notifications";

      if (nextValue === "notifications") {
        setTimeout(() => {
          markVisibleAsRead();
        }, 100);
      }

      return nextValue;
    });
  };

  const handleMarkAllRead = async () => {
    const unread = notifications.filter((n) => !n.read);

    for (const notif of unread) {
      const ref = doc(db, "notifications", notif.id);
      await updateDoc(ref, { read: true });
    }

    setUnreadCount(0);
  };

  const handleCloseFullPage = (e) => {
    e?.stopPropagation?.();
    setShowFullPage(false);
  };

  const getTranslatedValue = (value, fallback) => {
    if (!value) return fallback;
    if (typeof value === "string") return value;
    if (typeof value === "object") {
      return value[language] || value.en || value.sq || fallback;
    }
    return fallback;
  };

  const handleNotificationClick = (notif) => {
    if (!notif.read) {
      const ref = doc(db, "notifications", notif.id);
      updateDoc(ref, { read: true }).catch((error) =>
        console.error("Error marking notification as read:", error),
      );
    }
  };

  const renderNotificationItem = (notif) => (
    <div
      key={notif.id}
      data-id={notif.id}
      className={`notification-item ${notif.read ? "read" : "unread"}`}
      onClick={() => handleNotificationClick(notif)}
    >
      <strong>{getTranslatedValue(notif.title, "Notification")}</strong>
      <p>{getTranslatedValue(notif.body, "You have a new update.")}</p>
    </div>
  );

  const desktopDropdown =
    !isMobile() && isOpen ? (
      <div
        className="notification-dropdown"
        ref={dropdownRef}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="dropdown-notification">
          <span className="notify">{t("Notifications")}</span>

          {notifications.length > 0 && unreadCount > 0 && (
            <button
              type="button"
              className="mark-read"
              onClick={handleMarkAllRead}
            >
              {t("markAllRead") || "Mark all as read"}
            </button>
          )}
        </div>

        <div className="notification-items">
          {notifications.length ? (
            notifications.map(renderNotificationItem)
          ) : (
            <p className="no-notifs">{t("noNotifications")}</p>
          )}
        </div>
      </div>
    ) : null;

  const mobileFullPage =
    showFullPage && isMobile()
      ? createPortal(
          <div
            className="fullpage-notifications"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-header">
              <button
                className="back-btn"
                onClick={handleCloseFullPage}
                aria-label="Close notifications"
                type="button"
              >
                <X size={24} strokeWidth={2} />
              </button>

              <h4 className="header-title">{t("Notifications")}</h4>

              <div className="mobile-header-buttons">
                {notifications.length > 0 && unreadCount > 0 && (
                  <button
                    className="mark-read-mobile"
                    onClick={handleMarkAllRead}
                    type="button"
                  >
                    {t("markAll") || "Mark all"}
                  </button>
                )}
              </div>
            </div>

            <div className="notification-items">
              {notifications.length ? (
                notifications.map(renderNotificationItem)
              ) : (
                <p className="no-notifs">{t("noNotifications")}</p>
              )}
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div className="notification-wrapper" ref={wrapperRef}>
        <button
          type="button"
          className="bell-container"
          onClick={handleDropdownOpen}
          aria-label="Open notifications"
          aria-expanded={isOpen || showFullPage}
        >
          <Bell className="bell-icon" />
          {unreadCount > 0 && (
            <span className="notif-badge">{unreadCount}</span>
          )}
        </button>

        {desktopDropdown}
      </div>

      {mobileFullPage}
    </>
  );
};
