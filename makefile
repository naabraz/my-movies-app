env-file:
	cd ios && \
	&& source ./env-vars.sh \
	&& sourcery --templates EnvironmentValues.stencil \
	--sources EnvironmentValues.stencil \
	--output EnvironmentValues.swift \
	--args apiURL=$$API_URL \
	&& cd ..