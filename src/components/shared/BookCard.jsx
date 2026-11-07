import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock, Mail } from "lucide-react";

const INQUIRY_EMAIL = "Info@pengamepublishing.com";

function inquiryHref({ subject, body }) {
  return `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
import { motion } from "framer-motion";

// A URL is considered "real" if it points to a specific product/page, not just a homepage
function isSpecificUrl(url) {
  if (!url) return false;
  const homepages = [
    "https://pengamepublishing.myshopify.com",
    "https://www.pengamepublishing.com",
    "https://pengamepublishing.com",
  ];
  return !homepages.includes(url.replace(/\/$/, ""));
}

export default function BookCard({ book, index = 0 }) {
  const inquiry = book.inquiry ? inquiryHref(book.inquiry) : null;
  const hasLink = Boolean(inquiry) || isSpecificUrl(book.purchaseUrl);
  const href = inquiry || book.purchaseUrl;
  const linkProps = inquiry ? {} : { target: "_blank", rel: "noopener noreferrer" };

  const imageContent = (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 p-6 flex justify-center">
      <img
        src={book.image}
        alt={book.title}
        className={`w-44 h-auto rounded-lg shadow-lg transition-transform duration-500 ${hasLink ? "group-hover:scale-105 cursor-pointer" : ""}`}
      />
      {book.badge && (
        <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground font-body text-xs">
          {book.badge}
        </Badge>
      )}
      {!hasLink && (
        <Badge className="absolute top-4 right-4 bg-muted text-muted-foreground font-body text-xs border border-border">
          Coming Soon
        </Badge>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50"
    >
      {/* Image — clickable if link exists */}
      {hasLink ? (
        <a href={href} {...linkProps}>
          {imageContent}
        </a>
      ) : (
        imageContent
      )}

      {/* Content */}
      <div className="p-6">
        <p className="text-xs uppercase tracking-wider text-primary font-body font-semibold mb-1">
          {book.series}
        </p>
        <h3 className="font-heading text-lg font-bold text-foreground mb-2 line-clamp-2">
          {book.title}
        </h3>
        <p className="font-body text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
          {book.description}
        </p>

        {book.price && (
          <p className="font-heading text-xl font-bold text-primary mb-4">{book.price}</p>
        )}

        {hasLink ? (
          <a href={href} {...linkProps}>
            <Button className="w-full bg-primary hover:bg-primary/90 font-body font-semibold text-sm">
              {inquiry ? (
                <>
                  <Mail className="w-4 h-4 mr-2" aria-hidden="true" />
                  {book.inquiry.label}
                </>
              ) : (
                <>
                  Purchase
                  <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
                </>
              )}
            </Button>
          </a>
        ) : (
          <Button disabled className="w-full bg-muted text-muted-foreground font-body font-semibold text-sm cursor-not-allowed">
            <Clock className="w-4 h-4 mr-2" />
            Coming Soon
          </Button>
        )}
      </div>
    </motion.div>
  );
}