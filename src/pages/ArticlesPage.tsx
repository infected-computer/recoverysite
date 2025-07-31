import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Calendar } from 'lucide-react';
import { Clock } from 'lucide-react';
import { User } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { Link } from "react-router-dom";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { WhatsAppFloat } from "../components/layout/WhatsAppFloat";
import OptimizedImage from "../components/OptimizedImage";

const articles = [
  {
    id: 1,
    title: "5 שגיאות נפוצות שגורמות לאובדן נתונים",
    excerpt: "המדריך המלא למניעת אובדן קבצים חשובים והגנה על הנתונים שלכם",
    author: "מומחה שחזור נתונים",
    date: "15 בינואר 2024",
    readTime: "5 דקות",
    category: "מניעה",
    image: "photo-1488590528505-98d2b5aba04b",
    featured: true
  },
  {
    id: 2,
    title: "מה לעשות כשהמחשב לא נדלק?",
    excerpt: "שלבים ראשונים לאבחון בעיה ומה לא לעשות כדי לא להחמיר את המצב",
    author: "מומחה שחזור נתונים",
    date: "12 בינואר 2024",
    readTime: "7 דקות",
    category: "חירום",
    image: "photo-1461749280684-dccba630e2f6"
  },
  {
    id: 3,
    title: "מחיקה בטעות: מה עושים?",
    excerpt: "הפעולות הראשונות שצריך לעשות ומה אסור לעשות לאחר מחיקה בטעות",
    author: "מומחה שחזור נתונים",
    date: "10 בינואר 2024",
    readTime: "4 דקות",
    category: "שחזור",
    image: "photo-1486312338219-ce68d2c6f44d"
  },
  {
    id: 4,
    title: "כונן קשיח מקלקל צלילים - מדריך הצלה",
    excerpt: "אבחון צלילים חשודים ואיך לפעול לשמירה על הנתונים",
    author: "מומחה שחזור נתונים",
    date: "8 בינואר 2024",
    readTime: "6 דקות",
    category: "תחזוקה",
    image: "photo-1531297484001-80022131f5a1"
  },
  {
    id: 5,
    title: "גיבוי נכון: המדריך השלם",
    excerpt: "איך לבנות מערכת גיבוי אמינה שתגן על הנתונים שלכם",
    author: "מומחה שחזור נתונים",
    date: "5 בינואר 2024",
    readTime: "10 דקות",
    category: "גיבוי",
    image: "photo-1460925895917-afdab827c52f"
  },
  {
    id: 6,
    title: "SSD לעומת HDD: השפעה על שחזור נתונים",
    excerpt: "ההבדלים בשחזור נתונים מסוגי כוננים שונים ומה זה אומר עליכם",
    author: "מומחה שחזור נתונים",
    date: "3 בינואר 2024",
    readTime: "8 דקות",
    category: "טכני",
    image: "photo-1597872200969-2b65d56bd16b"
  },
  {
    id: 7,
    title: "שחזור תמונות מכרטיס זיכרון פגום - המדריך המלא",
    excerpt: "איך לשחזר תמונות חתונה, נופש ורגעים חשובים מכרטיס זיכרון שהתקלקל",
    author: "מומחה שחזור נתונים",
    date: "28 בדצמבר 2023",
    readTime: "9 דקות",
    category: "שחזור",
    image: "photo-1516035069371-29a1b244cc32"
  },
  {
    id: 8,
    title: "וירוסי כופר (Ransomware) - איך לשחזר קבצים מוצפנים",
    excerpt: "מדריך מקצועי להתמודדות עם וירוסי כופר ושחזור קבצים מוצפנים ללא תשלום",
    author: "מומחה שחזור נתונים",
    date: "25 בדצמבר 2023",
    readTime: "12 דקות",
    category: "אבטחה",
    image: "photo-1550751827-4bd374c3f58b"
  },
  {
    id: 9,
    title: "שחזור נתונים ממחשב נייד שנפל - המדריך המקצועי",
    excerpt: "מה לעשות כשהמחשב הנייד נפל ולא נדלק, איך לשחזר נתונים מכונן פגום",
    author: "מומחה שחזור נתונים",
    date: "22 בדצמבר 2023",
    readTime: "10 דקות",
    category: "חירום",
    image: "photo-1541807084-5c52b6b3adef"
  },
  {
    id: 10,
    title: "שחזור נתונים מטלפון סמארטפון שנשבר - אנדרויד ואייפון",
    excerpt: "המדריך המקצועי לשחזור תמונות, אנשי קשר והודעות מטלפון סמארטפון פגום",
    author: "מומחה שחזור נתונים",
    date: "20 בדצמבר 2023",
    readTime: "11 דקות",
    category: "מובייל",
    image: "photo-1512941937669-90a1b58e7e9c"
  },
  {
    id: 11,
    title: "מדריך מקיף: איך לבחור מערכת גיבוי מושלמת לעסק שלכם",
    excerpt: "הכל על בחירת מערכת גיבוי עסקית - השוואת פתרונות, עלויות ואסטרטגיות מתקדמות",
    author: "מומחה שחזור נתונים",
    date: "18 בדצמבר 2023",
    readTime: "15 דקות",
    category: "גיבוי",
    image: "photo-1451187580459-43490279c0fa"
  }
];

const categories = ["הכל", "מניעה", "שחזור", "גיבוי", "חירום", "טכני", "תחזוקה", "אבטחה", "מובייל"];

export const ArticlesPage = () => {
  const openWhatsApp = () => {
    const message = encodeURIComponent("שלום, קראתי את המאמר באתר ואני זקוק לעזרה בשחזור קבצים.");
    window.open(`https://wa.me/972123456789?text=${message}`, '_blank');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background py-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <h1 className="font-hebrew text-4xl md:text-5xl font-bold mb-6">
          מאמרים ומדריכים
        </h1>
        <p className="font-hebrew text-xl text-muted-foreground max-w-3xl mx-auto">
          כל מה שצריך לדעת על שחזור נתונים, מניעת אובדן קבצים וגיבוי נכון
        </p>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Badge 
              key={category}
              variant="outline" 
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors font-hebrew"
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Featured Article */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <Card className="overflow-hidden border border-accent/20 bg-gradient-to-l from-accent/5 to-transparent">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="aspect-video lg:aspect-auto">
              <OptimizedImage 
                src={`https://images.unsplash.com/${articles[0].image}`}
                alt={articles[0].title}
                className="w-full h-full object-cover"
                width={800}
                height={600}
                priority={true}
                quality={85}
                aspectRatio="4/3"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <Badge className="w-fit mb-4 bg-accent text-accent-foreground">
                מאמר מומלץ
              </Badge>
              <h2 className="font-hebrew text-2xl md:text-3xl font-bold mb-4">
                {articles[0].title}
              </h2>
              <p className="font-hebrew text-muted-foreground mb-6">
                {articles[0].excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span className="font-hebrew">{articles[0].author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span className="font-hebrew">{articles[0].date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span className="font-hebrew">{articles[0].readTime}</span>
                </div>
              </div>
              <Link to={`/article/${articles[0].id}`}>
                <Button className="w-fit font-hebrew">
                  קרא עוד
                  <ArrowLeft className="mr-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map((article) => (
            <Link key={article.id} to={`/article/${article.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="aspect-video overflow-hidden">
                <OptimizedImage 
                  src={`https://images.unsplash.com/${article.image}`}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  width={600}
                  height={400}
                  quality={80}
                  aspectRatio="3/2"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="font-hebrew">
                    {article.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-hebrew">
                    {article.readTime}
                  </span>
                </div>
                <CardTitle className="font-hebrew text-lg leading-tight group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="font-hebrew text-muted-foreground text-sm mb-4">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span className="font-hebrew">{article.date}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="font-hebrew text-primary hover:text-primary/80">
                    קרא עוד
                  </Button>
                </div>
              </CardContent>
            </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4">
        <Card className="bg-primary/5 border-primary/20 text-center">
          <CardContent className="p-8">
            <h3 className="font-hebrew text-2xl font-bold mb-4">
              זקוק לעזרה מקצועית?
            </h3>
            <p className="font-hebrew text-muted-foreground mb-6">
              אם אתה מתמודד עם אובדן נתונים עכשיו, אל תחכה. פנה אלינו לבדיקה חינמית.
            </p>
            <Button 
              onClick={openWhatsApp}
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-hebrew"
            >
              קבל עזרה מיידית
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
    <Footer />
    <WhatsAppFloat />
    </>
  );
};