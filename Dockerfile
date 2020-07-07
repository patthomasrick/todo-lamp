FROM php:apache
RUN a2enmod rewrite
RUN a2enmod headers
RUN docker-php-ext-install mysqli pdo pdo_mysql
# CMD a2enmod rewrite
# CMD echo "LoadModule rewrite_module modules/mod_rewrite.so" >> /etc/httpd/conf/httpd.conf
