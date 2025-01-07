FROM fluent/fluentd:v1.15.3-1.0

ENV FLUENTD_CONF="fluentd.conf"

COPY fluentd.conf /fluentd/etc/fluent.conf

USER root 

RUN fluent-gem install fluent-plugin-elasticsearch --no-document

USER fluent

CMD ["fluentd", "-c", "/fluentd/etc/fluent.conf", "-v"]
